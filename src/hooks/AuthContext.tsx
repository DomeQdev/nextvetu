import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { User } from "@/util/typings";
import { getAPIKey, getUser } from "@/util/api";

type AuthContextType = {
    isLoading: boolean;
    user: User | null;
    apiKey: string | null;
    setLoginUser: (user: User) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    user: null,
    apiKey: null,
    setLoginUser: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const key = await getAPIKey();
        setApiKey(key);

        const loginKey = await AsyncStorage.getItem("loginKey");
        if (loginKey) {
            const user = await getUser(loginKey, key);

            if (user.user) {
                setUser(user.user);
            }
        }

        setIsLoading(false);
        SplashScreen.hideAsync();
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
        <AuthContext.Provider value={{ isLoading, user, apiKey, setLoginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
