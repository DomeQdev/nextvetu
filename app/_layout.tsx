import { PaperProvider } from "react-native-paper";
import theme from "@/src/util/theme";
import { AuthProvider } from "@/src/hooks/AuthContext";
import { Slot, SplashScreen } from "expo-router";
import { MapPortalProvider } from "@/src/hooks/MapContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default () => {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <AuthProvider>
                    <MapPortalProvider>
                        <Slot />
                    </MapPortalProvider>
                </AuthProvider>
            </PaperProvider>
        </SafeAreaProvider>
    );
};
