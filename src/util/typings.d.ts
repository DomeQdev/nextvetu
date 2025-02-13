export type APIResponse<T> = Promise<T & { error?: { message: string } }>;

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
    electric_lock: boolean;
    biketype: number;
    start_place_lat: number;
    start_place_lng: number;
    start_place_name: string;
    end_place_lat: number;
    end_place_lng: number;
    end_place_name: string;
    start_time: number;
    end_time: number;
    price: number;
    price_service: number;
    distance: number;
};

type Transaction = {
    node: "transaction";
    id: number;
    date: string;
    amount: number;
    text: string;
};
