
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

// Endpoints that do not require an access token.
const PUBLIC_ENDPOINTS = [
    "/auth/login",
    "/auth/refresh",
    "/auth/logout",
    "/api/users",
];

function isPublicEndpoint(endpoint) {
    return PUBLIC_ENDPOINTS.includes(endpoint);
}

async function parseResponse(response) {
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json().catch(() => null);
    }

    const text = await response.text();
    return text || null;
}

function errorMessage(data, status) {
    if (typeof data === "string" && data) {
        return data;
    }

    if (data?.fields && Object.keys(data.fields).length > 0) {
        return Object.values(data.fields).join(" ");
    }

    return (
        data?.error ||
        data?.message ||
        `Request failed with status ${status}`
    );
}

function expireSession() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth:expired"));
}

// Prevent multiple simultaneous refresh requests.
let refreshPromise = null;

async function doRefresh() {
    let response;

    try {
        response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
    } catch {
        throw new ApiError(
            "Cannot reach the server. Check that the API is running.",
            0
        );
    }

    if (!response.ok) {
        expireSession();

        throw new ApiError(
            "Your session has expired. Please log in again.",
            response.status
        );
    }

    const data = await parseResponse(response);

    if (!data?.accessToken) {
        expireSession();

        throw new ApiError(
            "Invalid refresh response from server.",
            response.status,
            data
        );
    }

    localStorage.setItem("token", data.accessToken);

    return data.accessToken;
}

function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = doRefresh().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}

// Main API request function.
export async function request(endpoint, options = {}, retry = true) {
    const publicEndpoint = isPublicEndpoint(endpoint);
    const token = localStorage.getItem("token");

    const headers = { ...options.headers };

    // Let the browser set the multipart boundary for FormData.
    const isFormData =
        typeof FormData !== "undefined" &&
        options.body instanceof FormData;

    if (options.body && !isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (token && !publicEndpoint) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        delete headers.Authorization;
    }

    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: "include",
        });
    } catch {
        throw new ApiError(
            "Cannot reach the server. Check that the API is running.",
            0
        );
    }

    if (response.status === 401 && retry && token && !publicEndpoint) {
        try {
            // Another request may already have refreshed the token.
            if (localStorage.getItem("token") === token) {
                await refreshAccessToken();
            }

            return request(endpoint, options, false);
        } catch (error) {
            expireSession();
            throw error;
        }
    }

    const data = await parseResponse(response);

    if (!response.ok) {
        throw new ApiError(
            errorMessage(data, response.status),
            response.status,
            data
        );
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

export function logout() {
    return request("/auth/logout", {
        method: "POST",
    });
}

export function signup(user) {
    return request("/api/users", {
        method: "POST",
        body: JSON.stringify(user),
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

// Comments API
export function getComments(postId) {
    return request(`/api/comments?postId=${postId}`);
}

export function createComment(postId, text) {
    return request("/api/comments", {
        method: "POST",
        body: JSON.stringify({ postId, text }),
    });
}

export function deleteComment(id) {
    return request(`/api/comments/${id}`, {
        method: "DELETE",
    });
}

// Profile API
export function getMyProfile() {
    return request("/api/profiles/me");
}

export function updateMyProfile(profile) {
    return request("/api/profiles/me", {
        method: "PUT",
        body: JSON.stringify(profile),
    });
}

export function uploadAvatar(file) {
    const formData = new FormData();
    formData.append("file", file);

    return request("/api/profiles/me/avatar", {
        method: "POST",
        body: formData,
    });
}
