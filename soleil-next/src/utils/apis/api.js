import axios from "axios";

export const crmApi = axios.create({
    baseURL: "https://my3.optima-crm.com/yiiapp/frontend/web/index.php?r=cms",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json'
    },
});

const inFlightRequests = new Map();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    
    const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params || {})}:${config.data || ''}`;
    
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        hasToken: !!token,
        isRetry: !!config._retry,
        requestKey
    });

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

api.interceptors.response.use((response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response
}, async(error) => {
    const originalRequest = error.config
    
    if (!originalRequest) return Promise.reject(error);

    console.log(`[API Error] ${error.response?.status} ${originalRequest?.url}`, {
        isRetry: !!originalRequest?._retry,
        isRefreshing: isRefreshing
    });

    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            console.log(`[API Queue] Queuing request: ${originalRequest.url}`);
            return new Promise(function(resolve, reject) {
                failedQueue.push({ resolve, reject });
            }).then(token => {
                originalRequest._retry = true; 
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return api(originalRequest);
            }).catch(err => {
                return Promise.reject(err);
            });
        }

        originalRequest._retry = true
        isRefreshing = true;
        console.log(`[API Refresh] Triggering token refresh for primary request: ${originalRequest.url}`);

        const refreshToken = localStorage.getItem("refresh_token")
        if (refreshToken) {
            try {
                const response = await axios.post("http://localhost:3000/api/auth/refresh-access-token", { refreshToken })
                const { token } = response.data
                localStorage.setItem("token", token)
                console.log(`[API Refresh] Token refreshed successfully`);
                processQueue(null, token);
                originalRequest.headers["Authorization"] = `Bearer ${token}`
                return api(originalRequest)
            } catch (err) {
                console.error(`[API Refresh] Token refresh failed`, err);
                processQueue(err, null);
                localStorage.removeItem("token")
                localStorage.removeItem("refresh_token")
                window.location.href = "http://localhost:3001/auth/login"
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
    }
    return Promise.reject(error)
})
