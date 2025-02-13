import Map from "@/src/components/map/Map";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default () => {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && <StatusBar style="dark" />}
            <Map />
        </>
    );
};
