const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export async function request(endpoint, options= {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    // Add JWT when the user is logged in
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
    } catch(error) {
        throw new ApiError(
            message || "Unable to connect to the server. Please check that backend is running.",
            response.status
        );
    }

    if (
        response.status === 401 &&
        retry &&
        endpoint !== "/auth/login" &&
        endpoint !== "/auth/refresh"
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
        let message;
        
        try {
            const data = await response.json();
            message = data.message;
        } catch {
            message = null;
        }

        switch (response.status) {
            case 400:
                throw new Error(message || "Invalid request.");
            
            case 401:
                throw new ApiError(
                    message || "You are not authenticated",
                    response.status,
                );
        
            case 403:
                throw new ApiError(
                    message || "You are not authorized to perform this action",
                    response.status,
                );

            case 404:
                throw new ApiError(
                    message ||"The requested resource was not found!",
                    response.status,
                );

            case 409:
                throw new ApiError(
                    message || "A resource with these details already exists.",
                    response.status,
                );

            default:
                if (response.status >= 500) {
                    throw new ApiError(
                        "Server error. Please try again later.",
                        response.status
                    )
                }
            throw new ApiError(
                message || "Something went wrong.",
                response.status
            );
        }
    }

    // Some DELETE endpoints may return no body
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export async function refreshAccessToken() {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new ApiError(
            "Your session has expired. Please log in again.",
            response.status
        );
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data.token;
}


export function getPosts() {
    return request("/posts");
}

export function getPost(id) {
    return request(`/posts/${id}`);
}

export function login(credentials) {
    return request("auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export function signup(user) {
    return request("/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
    });
}

export function getCurrentUser() {
    return request("/auth/me");
}

export function createPost(post) {
    return request("/posts", {
        method: "POST",
        body: JSON.stringify(post),
    });
}

export function updatePost(id, post) {
    return request(`/post/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
    });
}

export function deletePost(id) {
    return request(`/posts/${id}`, {
        method: "DELETE",
    });
}