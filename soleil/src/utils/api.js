import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const propertiesApi = axios.create({
    baseURL: import.meta.env.VITE_API_PROPERTY_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});

