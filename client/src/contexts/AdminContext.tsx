import { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType>({
    token: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("admin_token")
    );

    const login = (t: string) => {
        localStorage.setItem("admin_token", t);
        setToken(t);
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
    };

    return (
        <AdminContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);
