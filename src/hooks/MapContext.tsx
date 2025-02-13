import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type MapPortalContextType = {
    addPortalElement: (element: ReactNode) => void;
    removePortalElement: (element: ReactNode) => void;
    portalElements: ReactNode[];
};

export const MapPortalContext = createContext<MapPortalContextType>({
    addPortalElement: () => {},
    removePortalElement: () => {},
    portalElements: [],
});

export const useMapPortal = () => useContext(MapPortalContext);

export const MapPortalProvider = ({ children }: { children: ReactNode }) => {
    const [portalElements, setPortalElements] = useState<ReactNode[]>([]);

    const addPortalElement = (element: ReactNode) => {
        setPortalElements((prev) => [...prev, element]);
    };

    const removePortalElement = (element: ReactNode) => {
        setPortalElements((prev) => prev.filter((el) => el !== element));
    };

    return (
        <MapPortalContext.Provider value={{ addPortalElement, removePortalElement, portalElements }}>
            {children}
        </MapPortalContext.Provider>
    );
};

export const MapPortal = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const { addPortalElement, removePortalElement } = useMapPortal();

    useEffect(() => {
        addPortalElement(children);

        return () => removePortalElement(children);
    }, [children]);

    return null;
};
