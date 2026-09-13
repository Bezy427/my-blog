import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, refreshAccessToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setLoading(false);
                return;
            }

            
            try {
                let currentUser;

                try {
                    currentUser = await getCurrentUser();
                } catch(error) {
                    if (error.status !== 401) {
                        throw error;
                    }

                    const newToken = await refreshAccessToken();

                    setToken(newToken);

                    currentUser = await getCurrentUser();
                }
                setUser(currentUser);
            } catch (error) {
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext
            value={{
                token,
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}