import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import theme from "@/util/theme";
import { AuthProvider } from "@/hooks/AuthContext";
import { MapPortalProvider } from "@/hooks/MapContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer theme={DarkTheme}>
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                            <MapPortalProvider>
                                <PaperProvider theme={theme}>
                                    <App />
                                </PaperProvider>
                            </MapPortalProvider>
                        </AuthProvider>
                    </QueryClientProvider>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};
