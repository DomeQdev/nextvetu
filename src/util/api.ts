import { APIResponse, Location, Rental, UnlockLink, User } from "./typings";

const BASE = "https://api.nextbike.net/api";

export const getAPIKey = async () => {
    // return fetch("https://webview.nextbike.net/getAPIKey.json", {
    //     headers: { "user-agent": "nextbike-av4" },
    // })
    //     .then((res) => res.json())
    //     .then((res) => res.apiKey as string)
    //     .catch(() => "");

    return "rXXqTgQZUPZ89lzB";
};

export const login = async (mobile: string, pin: string, apiKey: string) => {
    const formData = new FormData();
    formData.append("mobile", `48${mobile}`);
    formData.append("pin", pin);
    formData.append("show_errors", "1");
    formData.append("apikey", apiKey);

    return fetch(BASE + "/login.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ user: User }>);
};

export const recoverPin = async (mobile: string, apiKey: string) => {
    const formData = new FormData();
    formData.append("mobile", `48${mobile}`);
    formData.append("api_key", apiKey);

    return fetch(BASE + "/v1.1/pinRecover.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{}>);
};

export const getUser = async (loginKey: string, apiKey: string) => {
    const formData = new FormData();
    formData.append("loginkey", loginKey);
    formData.append("api_key", apiKey);

    return fetch(BASE + "/v1.1/getUserDetails.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ user: User }>);
};

export const getUserRentals = async (loginKey: string, apiKey: string) => {
    const formData = new FormData();
    formData.append("loginkey", loginKey);
    formData.append("apikey", apiKey);
    formData.append("limit", "1000000");

    return fetch(BASE + "/v1.1/list.json", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json() as APIResponse<{ account: { items: Rental[] } }>)
        .then((res) =>
            res.account.items
                .filter((item) => item.node === "rental")
                .sort((a, b) => b.start_time - a.start_time)
        );
};

export const getPaymentLinks = async (loginKey: string, apiKey: string) => {
    const formData = new FormData();
    formData.append("loginkey", loginKey);
    formData.append("api_key", apiKey);

    return fetch(BASE + "/v1.1/getUnlockLinks.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ unlocklinks: UnlockLink[] }>);
};

export const getRoute = async (locations: Location[], signal: AbortSignal) => {
    const locs = locations.map((loc) => loc.join(",")).join(";");

    return fetch(
        `https://routing.openstreetmap.de/routed-bike/route/v1/driving/${locs}?overview=full&geometries=geojson`,
        { signal }
    )
        .then((res) => res.json())
        .then((res) => res.routes[0].geometry as GeoJSON.LineString)
        .catch(() => null);
};
