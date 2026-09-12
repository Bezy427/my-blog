const API_URL = "https://localhost:8080";

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

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("You are not authenticated");
        }

        if (response.status === 403) {
            throw new Error("You are not authorized to perform this action");
        }

        throw new Error("Request failed!");
    }

    // Some DELETE endpoints may return no body
    if (response.status === 204) {
        return null;
    }

    return response.json();
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