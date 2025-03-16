import { useMapPortal } from "@/hooks/MapContext";
import Mapbox from "@rnmapbox/maps";
import { StyleProp, ViewStyle } from "react-native";

Mapbox.setAccessToken(
    "pk.eyJ1IjoiZG9tZXEyYWx0IiwiYSI6ImNtNzZlNnV1cDA1aXoya3NlcDMyaXE0M3cifQ.790UTgjHsL7W6EMgzZFQ_Q"
);

type Props = {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};

export default ({ style, children }: Props) => {
    const { mapProps } = useMapPortal();

    return (
        <Mapbox.MapView
            attributionEnabled={false}
            logoEnabled={false}
            scaleBarEnabled={false}
            styleURL="mapbox://styles/domeq/cm5e9yo8c00ph01s9h3drbass"
            pitchEnabled={false}
            style={style}
            {...mapProps}
        >
            {children}
        </Mapbox.MapView>
    );
};
