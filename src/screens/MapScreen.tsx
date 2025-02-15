import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMapPortal } from "../hooks/MapContext";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";
import Map from "./Map";

Mapbox.setAccessToken(
    "pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA"
);

export type MapStackParamList = {
    MapHome: undefined;
    Rentals: undefined;
};

const MapStack = createNativeStackNavigator<MapStackParamList>();

export default () => {
    const { portalElements } = useMapPortal();
    const isFocused = useIsFocused();

    return (
        <View style={{ flex: 1 }}>
            {isFocused && <StatusBar style="dark" />}

            <MapStack.Navigator screenOptions={{ headerShown: false }}>
                <MapStack.Screen name="MapHome" component={Map} />
                {/* <MapStack.Screen name="Rentals" component={RentalsScreen} /> */}
            </MapStack.Navigator>

            <Mapbox.MapView
                style={{ flex: 1 }}
                attributionEnabled={false}
                logoEnabled={false}
                scaleBarEnabled={false}
            >
                {portalElements}
            </Mapbox.MapView>
        </View>
    );
};
