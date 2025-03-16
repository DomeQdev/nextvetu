import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import Mapbox from "@rnmapbox/maps";

export type MapboxProps = React.ComponentProps<typeof Mapbox.MapView>;

type MapPortalContextType = {
    addPortalElement: (element: ReactNode) => void;
    removePortalElement: (element: ReactNode) => void;
    portalElements: ReactNode[];
    mapProps: MapboxProps;
    setMapProps: (props: MapboxProps) => void;
};

export const MapPortalContext = createContext<MapPortalContextType>({
    addPortalElement: () => {},
    removePortalElement: () => {},
    portalElements: [],
    mapProps: {},
    setMapProps: () => {},
});

export const useMapPortal = () => useContext(MapPortalContext);

export const MapPortalProvider = ({ children }: { children: ReactNode }) => {
    const [portalElements, setPortalElements] = useState<ReactNode[]>([]);
    const [mapProps, setMapProps] = useState<MapboxProps>({});

    const addPortalElement = (element: ReactNode) => {
        setPortalElements((prev) => [...prev, element]);
    };

    const removePortalElement = (element: ReactNode) => {
        setPortalElements((prev) => prev.filter((el) => el !== element));
    };

    return (
        <MapPortalContext.Provider
            value={{
                addPortalElement,
                removePortalElement,
                portalElements,
                mapProps,
                setMapProps,
            }}
        >
            {children}
        </MapPortalContext.Provider>
    );
};

export const MapPortal = ({ children, mapProps }: { children: React.ReactNode; mapProps?: MapboxProps }) => {
    const { addPortalElement, removePortalElement, setMapProps } = useMapPortal();

    useEffect(() => {
        if (mapProps) setMapProps(mapProps);

        return () => setMapProps({});
    }, [mapProps]);

    useEffect(() => {
        addPortalElement(children);
        return () => removePortalElement(children);
    }, [children]);

    return null;
};
