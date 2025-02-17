import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { useMapPortal } from "@/hooks/MapContext";
import { StatusBar } from "expo-status-bar";
import MapHome from "./MapHome";
import Map from "../../components/Map";

export type MapStackParamList = {
    MapHome: undefined;
};

const Stack = createNativeStackNavigator<MapStackParamList>();

export default () => {
    const { portalElements, childrenElements } = useMapPortal();
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && <StatusBar style="dark" />}

            <Map
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                {portalElements}
            </Map>
            {childrenElements}

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MapHome" component={MapHome} />
            </Stack.Navigator>
        </>
    );
};
