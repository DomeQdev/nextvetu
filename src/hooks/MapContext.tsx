import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type MapPortalContextType = {
    addPortalElement: (element: ReactNode) => void;
    removePortalElement: (element: ReactNode) => void;
    addChildrenElement: (element: ReactNode) => void;
    removeChildrenElement: (element: ReactNode) => void;
    portalElements: ReactNode[];
    childrenElements: ReactNode[];
};

export const MapPortalContext = createContext<MapPortalContextType>({
    addPortalElement: () => {},
    removePortalElement: () => {},
    addChildrenElement: () => {},
    removeChildrenElement: () => {},
    portalElements: [],
    childrenElements: [],
});

export const useMapPortal = () => useContext(MapPortalContext);

export const MapPortalProvider = ({ children }: { children: ReactNode }) => {
    const [portalElements, setPortalElements] = useState<ReactNode[]>([]);
    const [childrenElements, setChildrenElements] = useState<ReactNode[]>([]);

    const addPortalElement = (element: ReactNode) => {
        setPortalElements((prev) => [...prev, element]);
    };

    const removePortalElement = (element: ReactNode) => {
        setPortalElements((prev) => prev.filter((el) => el !== element));
    };

    const addChildrenElement = (element: ReactNode) => {
        setChildrenElements((prev) => [...prev, element]);
    };

    const removeChildrenElement = (element: ReactNode) => {
        setChildrenElements((prev) => prev.filter((el) => el !== element));
    };

    return (
        <MapPortalContext.Provider 
            value={{ 
                addPortalElement, 
                removePortalElement, 
                addChildrenElement, 
                removeChildrenElement,
                portalElements,
                childrenElements 
            }}
        >
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

export const MapChildrenPortal = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const { addChildrenElement, removeChildrenElement } = useMapPortal();

    useEffect(() => {
        addChildrenElement(children);
        return () => removeChildrenElement(children);
    }, [children]);

    return null;
};
