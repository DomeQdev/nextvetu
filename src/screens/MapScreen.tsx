import Map from "@/src/components/map/Map";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

export default function MapScreen() {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && <StatusBar style="dark" />}
            <Map />
        </>
    );
}