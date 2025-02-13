import { useMapPortal } from "@/src/hooks/MapContext";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
    "pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA"
);

export default () => {
    const { portalElements } = useMapPortal();

    return (
        <Mapbox.MapView
            style={{ flex: 1 }}
            attributionEnabled={false}
            logoEnabled={false}
            scaleBarEnabled={false}
        >
            {portalElements}
        </Mapbox.MapView>
    );
};
