import { APIResponse, Rental, Transaction, User } from "./typings";

const BASE = "https://api.nextbike.net/api";
let apiKey: string | null = null;

const getAPIKey = async () => {
    if (apiKey) return apiKey;

    return fetch("https://webview.nextbike.net/getAPIKey.json", {
        headers: { "user-agent": "nextbike-av4" },
    })
        .then((res) => res.json())
        .then((res) => {
            apiKey = res.apiKey as string;

            return apiKey;
        })
        .catch(() => "");
};

export const login = async (mobile: string, pin: string) => {
    const formData = new FormData();
    formData.append("mobile", `48${mobile}`);
    formData.append("pin", pin);
    formData.append("show_errors", "1");
    formData.append("apikey", await getAPIKey());

    return fetch(BASE + "/login.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ user: User }>);
};

export const recoverPin = async (mobile: string) => {
    const formData = new FormData();
    formData.append("mobile", `48${mobile}`);
    formData.append("api_key", await getAPIKey());

    return fetch(BASE + "/v1.1/pinRecover.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{}>);
};

export const getUser = async (loginKey: string) => {
    const formData = new FormData();
    formData.append("loginkey", loginKey);
    formData.append("api_key", await getAPIKey());

    return fetch(BASE + "/v1.1/getUserDetails.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ user: User }>);
};

export const getUserAndRentals = async (loginKey: string) => {
    const formData = new FormData();
    formData.append("loginkey", loginKey);
    formData.append("apikey", await getAPIKey());
    formData.append("limit", "100000");

    return fetch(BASE + "/v1.1/list.json", {
        method: "POST",
        body: formData,
    }).then((res) => res.json() as APIResponse<{ user: User; account: { items: (Rental | Transaction)[] } }>);
};
