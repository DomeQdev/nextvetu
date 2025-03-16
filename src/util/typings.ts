export type APIResponse<T> = Promise<T & { error?: { message: string } }>;
export type Location = [number, number];

export type User = {
    active: boolean;
    credits: number;
    currency: string;
    email: string;
    id: number;
    loginkey: string;
    max_bikes: number;
    mobile: string;
    needs_email_verification: boolean;
    screen_name: string;
    pesel: string;
};

export type Rental = {
    node: "rental";
    id: number;
    bike: string;
    biketype: number;
    domain: string;
    start_place: number;
    start_place_lat: number;
    start_place_lng: number;
    start_place_name: string;
    end_place: number;
    end_place_lat: number;
    end_place_lng: number;
    end_place_name: string;
    start_time: number;
    end_time: number;
    price: number;
    price_service: number;
    distance: number;
};

export type UnlockLink = {
    link_url: string;
    option: "transferuj_cc" | "transferuj_freeamount" | "tpay_card_register";
};

export type Flexzones = {
    hash: string;
    nodeValue: GeoJSON.FeatureCollection<GeoJSON.Polygon, FlexzoneProperties>;
};

export type FlexzoneProperties = {
    color: string;
    fill: string;
    name: string;
    domain: string;
    category: "free_return" | "chargeable_return";
};

export type Bike = [id: number, number: string, type: number, battery: number | null, location?: Location];

export enum EBike {
    id = 0,
    number = 1,
    type = 2,
    battery = 3,
    location = 4,
}

export type Station = [id: number, name: string, number: string, location: Location, bikes: Bike[]];

export enum EStation {
    id = 0,
    name = 1,
    number = 2,
    location = 3,
    bikes = 4,
}

export type MapFeatures = {
    stations?: Station[];
    freestandingBikes?: Bike[];
};
