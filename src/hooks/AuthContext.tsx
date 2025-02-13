import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { User } from "@/src/util/typings";
import { getUser } from "@/src/util/api";

type AuthContextType = {
    isLoading: boolean;
    user: User | null;
    setLoginUser: (user: User) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    user: null,
    setLoginUser: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkLoginStatus();
        SplashScreen.hideAsync();
    }, []);

    const checkLoginStatus = async () => {
        const loginKey = await AsyncStorage.getItem("loginKey");

        if (loginKey) {
            const user = await getUser(loginKey);

            if (user.user) {
                setUser(user.user);
            }
        }

        setIsLoading(false);
    };

    const setLoginUser = async (user: User) => {
        await AsyncStorage.setItem("loginKey", user.loginkey);

        setUser(user);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoading, user, setLoginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
