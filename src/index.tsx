import { PaperProvider } from "react-native-paper";
import theme from "@/src/util/theme";
import { AuthProvider } from "@/src/hooks/AuthContext";
import { MapPortalProvider } from "@/src/hooks/MapContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import App from "./App";

SplashScreen.preventAutoHideAsync();

export default () => {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <AuthProvider>
                    <MapPortalProvider>
                        <App />
                    </MapPortalProvider>
                </AuthProvider>
            </PaperProvider>
        </SafeAreaProvider>
    );
};
