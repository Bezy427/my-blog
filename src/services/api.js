
const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function request(endpoint, options = {}, retry = true) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Do not attach an existing token to public authentication requests.
    const publicEndpoints = [
    "/auth/login",
    "/auth/refresh",
    "/api/users",
];

const isPublicEndpoint = publicEndpoints.includes(endpoint);

if (token && !isPublicEndpoint) {
    headers.Authorization = `Bearer ${token}`;
}

    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
    } catch {
        throw new ApiError(
            "Unable to connect to the server. Please check that the backend is running.",
            0
        );
    }

    // Refresh the access token once after a 401 response.
    if (
        response.status === 401 &&
        retry &&
        !isAuthEndpoint
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

    if (!response.ok) {
        const responseText = await response.text();

        console.error(
            `API error ${response.status} at ${endpoint}:`,
            responseText
        );

        let message = null;

        try {
            const data = JSON.parse(responseText);

            message =
                data.message ||
                data.detail ||
                data.error ||
                data.title ||
                (data.errors
                    ? JSON.stringify(data.errors)
                    : null);
        } catch {
            if (responseText) {
                message = responseText;
            }
        }

        switch (response.status) {
            case 400:
                throw new ApiError(
                    message || "Invalid request.",
                    response.status
                );

            case 401:
                throw new ApiError(
                    message || "You are not authenticated.",
                    response.status
                );

            case 403:
                throw new ApiError(
                    message || "You are not authorized to perform this action.",
                    response.status
                );

            case 404:
                throw new ApiError(
                    message || "The requested resource was not found.",
                    response.status
                );

            case 409:
                throw new ApiError(
                    message || "A resource with these details already exists.",
                    response.status
                );

            default:
                if (response.status >= 500) {
                    throw new ApiError(
                        message || "Server error. Please try again later.",
                        response.status
                    );
                }

                throw new ApiError(
                    message || "Something went wrong.",
                    response.status
                );
        }
    }

    if (
        response.status === 204 ||
        response.headers.get("content-length") === "0"
    ) {
        return null;
    }

    const responseText = await response.text();

    if (!responseText) {
        return null;
    }

    try {
        return JSON.parse(responseText);
    } catch {
        return responseText;
    }
}

export async function refreshAccessToken() {
    let response;

    try {
        response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
    } catch {
        throw new ApiError(
            "Unable to refresh your session. Check your connection.",
            0
        );
    }

    if (!response.ok) {
        throw new ApiError(
            "Your session has expired. Please log in again.",
            response.status
        );
    }

    const data = await response.json();

    if (!data.token) {
        throw new ApiError(
            "The server did not return an access token.",
            response.status
        );
    }

    localStorage.setItem("token", data.token);

    return data.token;
}

export function getPosts() {
    return request("/api/posts");
}

export function getPost(id) {
    return request(`/api/posts/${id}`);
}

export function login(credentials) {
    return request("/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
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
