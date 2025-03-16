import { MapPortal } from "@/hooks/MapContext";
import { getFeatures } from "@/util/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Stations from "./Stations";
import { EBike } from "@/util/typings";
import BikeMarker from "./Bikes";
import { useDebounce } from "use-debounce";
import { MapNavigation } from "../MapRouter";
import Flexzones from "./Flexzones";
import { MapState } from "@rnmapbox/maps";

export default ({ navigation }: { navigation: MapNavigation }) => {
    const [_bounds, setBounds] = useState<GeoJSON.Position[] | undefined>();
    const [bounds] = useDebounce(_bounds, 100);

    const { data, refetch } = useQuery({
        queryKey: "places",
        queryFn: ({ signal }) => getFeatures(bounds, signal!),
    });

    useEffect(() => {
        refetch();
    }, [bounds]);

    return (
        <MapPortal
            mapProps={{
                onCameraChanged: ({ properties }: MapState) =>
                    setBounds([properties.bounds.sw, properties.bounds.ne]),
            }}
        >
            {data?.stations && <Stations stations={data.stations} navigation={navigation} />}
            {data?.freestandingBikes?.map((bike) => (
                <BikeMarker key={bike[EBike.id]} bike={bike} />
            ))}
            <Flexzones />
        </MapPortal>
    );
};
