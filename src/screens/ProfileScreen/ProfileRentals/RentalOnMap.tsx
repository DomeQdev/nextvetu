import { getRoute } from "@/util/api";
import theme from "@/util/theme";
import { Location, Rental } from "@/util/typings";
import Mapbox from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";
import { useQuery } from "react-query";

export default ({ rental }: { rental: Rental }) => {
    const startLocation: Location = [rental.start_place_lng, rental.start_place_lat];
    const endLocation: Location = [rental.end_place_lng, rental.end_place_lat];

    const placeholder = {
        type: "LineString",
        coordinates: [startLocation, endLocation],
    } as GeoJSON.LineString;

    const { data: shape } = useQuery({
        queryKey: ["shape", rental.start_place, rental.end_place],
        queryFn: async ({ signal }) => {
            if (rental.start_place === rental.end_place) return placeholder;

            await new Promise((resolve) => setTimeout(resolve, 300));
            if (signal?.aborted) return;

            const route = await getRoute([startLocation, endLocation], signal!);
            if (!route) return placeholder;

            return route;
        },
        placeholderData: placeholder,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Mapbox.Camera
                zoomLevel={14}
                bounds={{
                    ne: [rental.end_place_lng, rental.end_place_lat],
                    sw: [rental.start_place_lng, rental.start_place_lat],
                }}
                maxZoomLevel={18}
                animationDuration={1000}
                padding={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    paddingTop: 50,
                    paddingBottom: 50,
                }}
            />

            <Mapbox.ShapeSource id="route" shape={shape!}>
                <Mapbox.LineLayer
                    id="route"
                    style={{ lineColor: theme.colors.primaryContainer, lineWidth: 3 }}
                />
            </Mapbox.ShapeSource>

            {[startLocation, endLocation].map((location, index) => (
                <Mapbox.MarkerView key={`marker${index}`} coordinate={location!}>
                    <View style={style.marker}>
                        <Icon
                            source={index === 0 ? "map-marker" : "flag-checkered"}
                            size={18}
                            color={theme.colors.onPrimaryContainer}
                        />
                    </View>
                </Mapbox.MarkerView>
            ))}
        </>
    );
};

const style = StyleSheet.create({
    marker: {
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 8,
        padding: 6,
    },
});
