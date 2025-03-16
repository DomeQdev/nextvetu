import { Flexzones } from "@/util/typings";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { FillLayer, LineLayer, ShapeSource } from "@rnmapbox/maps";
import { DOMAINS, getFlexzones } from "@/util/api";
import useStorage from "@/hooks/useStorage";

export default () => {
    const [flexzones, setFlexzones] = useState<Flexzones>();
    const { apiKey } = useAuth();
    const storage = useStorage();

    const updateFlexzones = async () => {
        if (!apiKey) return;

        const cache = JSON.parse(storage.getString("flexzonesCache") || "null");
        const apiFlexzones = await getFlexzones(apiKey, cache?.hash);

        if (apiFlexzones) {
            const flexzonesObject = {
                hash: apiFlexzones.geojson.hash,
                nodeValue: {
                    ...apiFlexzones.geojson.nodeValue,
                    features: apiFlexzones.geojson.nodeValue.features.filter((feature) =>
                        DOMAINS.includes(feature.properties.domain)
                    ),
                },
            };

            setFlexzones(flexzonesObject);
            storage.set("flexzonesCache", JSON.stringify(flexzonesObject));
        } else if (cache) {
            setFlexzones(cache);
        }
    };

    useEffect(() => {
        updateFlexzones();
    }, [apiKey]);

    if (!flexzones) return null;

    return (
        <ShapeSource id="flexzones" shape={flexzones.nodeValue}>
            <FillLayer
                id="flexzones"
                style={{
                    fillColor: ["get", "fill"],
                    fillOpacity: 0.08,
                }}
                filter={[">=", ["zoom"], 8]}
            />
            <LineLayer
                id="flexzonesOutline"
                style={{
                    lineColor: ["get", "color"],
                    lineWidth: 1,
                }}
                filter={[">=", ["zoom"], 8]}
            />
        </ShapeSource>
    );
};
