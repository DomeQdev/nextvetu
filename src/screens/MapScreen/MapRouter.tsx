import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { create } from "zustand";
import { MapStackParamList } from ".";
import Map from "@/components/Map";
import { useMapPortal } from "@/hooks/MapContext";
import MapHome from "./MapHome";
import MapStation from "./MapStation";
import { useEffect } from "react";

type MapRouterStore = {
    screen: Screen;
    setScreen: (screen: Screen) => void;
};

type Screen = { name: "MapHome" } | { name: "MapStation"; params: MapStackParamList["MapStation"] };

export const useMapRouterStore = create<MapRouterStore>((set) => ({
    screen: { name: "MapHome" },
    setScreen: (screen) => set({ screen }),
}));

type MapProps<T extends keyof MapStackParamList = "MapRouter"> = NativeStackScreenProps<MapStackParamList, T>;
export type MapNavigation = MapProps["navigation"];

export default (props: MapProps) => {
    const screen = useMapRouterStore((state) => state.screen);
    const { portalElements } = useMapPortal();

    console.log(props.route)

    useEffect(() => {
        if (props.route.name === "MapRouter") {
            useMapRouterStore.setState({ screen: { name: "MapHome" } });
        }
    }, [props.route]);

    return (
        <>
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

            {screen.name === "MapHome" && <MapHome navigation={props.navigation} />}
            {screen.name === "MapStation" && (
                <MapStation navigation={props.navigation} params={screen.params} />
            )}
        </>
    );
};

export const MapRouterStation = ({ route }: MapProps<"MapStation">) => {
    const setScreen = useMapRouterStore((state) => state.setScreen);

    useEffect(() => {
        setScreen({ name: "MapStation", params: route.params });
    }, []);

    return null;
};
