import { EStation, Station } from "@/util/typings";
import { ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { MapNavigation } from "../MapRouter";

type Props = {
    stations: Station[];
    navigation: MapNavigation;
};

export default ({ stations, navigation }: Props) => {
    const geoJSON = {
        type: "FeatureCollection",
        features: stations.map((station) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: station[EStation.location] },
            properties: {
                id: station[EStation.id],
                name: station[EStation.name],
                number: station[EStation.number],
                location: station[EStation.location],
                bikes: station[EStation.bikes],
                bikesLength: station[EStation.bikes].length,
            },
        })),
    } as GeoJSON.FeatureCollection;

    return (
        <ShapeSource
            id="stations"
            shape={geoJSON}
            onPress={({ features }) => {
                const feature = features?.[0];
                if (!feature) return;

                navigation.navigate("MapStation", { properties: feature.properties });
            }}
        >
            <SymbolLayer
                id="station"
                style={{
                    iconImage: ["image", "stations"],
                    iconSize: 0.8,
                    iconAllowOverlap: true,
                    textField: ["get", "bikesLength"],
                    textAllowOverlap: true,
                }}
            />
        </ShapeSource>
    );
};
