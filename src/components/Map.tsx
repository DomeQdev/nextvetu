import { StyleProp, ViewStyle } from "react-native";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
    "pk.eyJ1IjoiZG9tZXEyYWx0IiwiYSI6ImNtNzZlNnV1cDA1aXoya3NlcDMyaXE0M3cifQ.790UTgjHsL7W6EMgzZFQ_Q"
);

type Props = {
    style?: StyleProp<ViewStyle>;
    ref?: React.RefObject<Mapbox.MapView>;
    children: React.ReactNode;
};

export default ({ style, ref, children }: Props) => (
    <Mapbox.MapView
        style={style}
        ref={ref}
        attributionEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        styleURL="mapbox://styles/domeq2alt/cm76e567v008i01r8eayq4ix8"
    >
        {children}
    </Mapbox.MapView>
);
