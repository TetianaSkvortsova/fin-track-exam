import axios from "axios";

export let client = null;

export function setAuthHeader(token: string) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function initializeClient() {
    if (!client) {
        client = axios.create();
    }
}

initializeClient();