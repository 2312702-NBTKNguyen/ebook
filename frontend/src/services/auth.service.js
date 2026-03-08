import api from "./api";

export const loginAPI = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        return response.data;
    } 
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const registerAPI = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getProfileAPI = async () => {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}