
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

const AUTH_ENDPOINTS = [
    "/auth/login",
    "/auth/refresh",
    "/auth/logout",
];

const PUBLIC_ENDPOINTS = [
    ...AUTH_ENDPOINTS,
    "/api/users",
];

function isPublicEndpoint(endpoint) {
    return PUBLIC_ENDPOINTS.includes(endpoint);
}

async function parseResponse(response) {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        return response.json();
    }

    const text = await response.text();
    return text || null;
}

async function refreshAccessToken() {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        localStorage.removeItem("token");

        throw new ApiError(
            "Your session has expired. Please log in again.",
            response.status
        );
    }

    const data = await parseResponse(response);

    if (!data?.accessToken) {
        throw new ApiError(
            "Invalid refresh response from server.",
            response.status,
            data
        );
    }

    localStorage.setItem("token", data.accessToken);

    return data.accessToken;
}

export async function request(endpoint, options = {}, retry = true) {
    const publicEndpoint = isPublicEndpoint(endpoint);

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (!publicEndpoint && token) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        delete headers.Authorization;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
    });

    if (
        response.status === 401 &&
        retry &&
        !publicEndpoint
    ) {
        try {
            const newToken = await refreshAccessToken();

            return request(
                endpoint,
                {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                },
                false
            );
        } catch (error) {
            localStorage.removeItem("token");
            throw error;
        }
    }

    const data = await parseResponse(response);

    if (!response.ok) {
        const message =
            typeof data === "string"
                ? data
                : data?.message ||
                  data?.error ||
                  `Request failed with status ${response.status}`;

        throw new ApiError(message, response.status, data);
    }

    return data;
}

// Authentication API

export function login(credentials) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export function signup(user) {
    return request("/api/users", {
        method: "POST",
        body: JSON.stringify(user),
    });
}

export function logout() {
    return request("/auth/logout", {
        method: "POST",
    });
}

export function getCurrentUser() {
    return request("/auth/me");
}

// Posts API

export function getPosts() {
    return request("/api/posts");
}

export function getPost(id) {
    return request(`/api/posts/${id}`);
}

export function createPost(post) {
    return request("/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
    });
}

export function updatePost(id, post) {
    return request(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
    });
}

export function deletePost(id) {
    return request(`/api/posts/${id}`, {
        method: "DELETE",
    });
}
