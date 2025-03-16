import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MapRouter, { MapRouterStation } from "./MapRouter";

export type MapStackParamList = {
    MapRouter: undefined;
    MapStation: { properties: GeoJSON.GeoJsonProperties };
};

const Stack = createNativeStackNavigator<MapStackParamList>();

export default () => {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && <StatusBar style="dark" />}

            <Stack.Navigator screenOptions={{ headerShown: false, presentation: "transparentModal" }}>
                <Stack.Screen name="MapRouter" component={MapRouter} />
                <Stack.Screen name="MapStation" component={MapRouterStation} />
            </Stack.Navigator>
        </>
    );
};
