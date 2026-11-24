
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentUser,
    logout as logoutRequest,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore the user's session when the application starts.
    useEffect(() => {
        let active = true;

        async function restoreSession() {
            const token = localStorage.getItem("token");

            if (!token) {
                if (active) {
                    setUser(null);
                    setLoading(false);
                }
                return;
            }

            try {
                const currentUser = await getCurrentUser();

                if (active) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Session restoration failed:", error);

                if (active) {
                    setUser(null);
                    localStorage.removeItem("token");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        restoreSession();

        return () => {
            active = false;
        };
    }, []);

    // Update authentication state after successful login.
    async function login(accessToken) {
        localStorage.setItem("token", accessToken);

        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            return currentUser;
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
            throw error;
        }
    }

    // Clear authentication state after logout.
    async function logout() {
        try {
            await logoutRequest();
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
