import { createContext, useContext, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { getAPIKey, getUser } from "@/util/api";
import { User } from "@/util/typings";
import useStorage from "./useStorage";

type AuthContextType = {
    isLoading: boolean;
    user: User | null;
    apiKey: string | null;
    setLoginUser: (user: User) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    user: null,
    apiKey: null,
    setLoginUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const storage = useStorage();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const key = await getAPIKey();
        setApiKey(key);

        const loginKey = storage.getString("loginKey");
        if (loginKey) {
            const user = await getUser(loginKey, key);

            if (user.user) {
                setUser(user.user);
            }
        }

        setIsLoading(false);
        SplashScreen.hideAsync();
    };

    const setLoginUser = (user: User) => {
        storage.set("loginKey", user.loginkey);

        setUser(user);
    };

    const logout = () => {
        storage.delete("loginKey");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoading, user, apiKey, setLoginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
