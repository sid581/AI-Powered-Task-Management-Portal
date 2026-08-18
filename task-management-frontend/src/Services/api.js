import axios from "axios";

const api = axios.create({
    baseURL: "https://precious-education-production-46c2.up.railway.app",
    headers: {
        "Content-Type": "application/json"
    }
});

//including JWT in each Request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


//logout when token expires (not allowed for protected endpoints)
api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 403) {

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;