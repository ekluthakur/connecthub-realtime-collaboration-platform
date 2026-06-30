import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkUser = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const { data } = await api.get("/users/profile");

                setUser(data);

            }

            catch {

                localStorage.removeItem("token");

            }

            finally {

                setLoading(false);

            }

        };

        checkUser();

    }, []);

    const login = async (email, password) => {

        const { data } = await api.post("/auth/login", {

            email,

            password,

        });

        localStorage.setItem("token", data.token);

        setUser(data.user);

    };

    const register = async (username, email, password) => {

        const { data } = await api.post("/auth/register", {

            username,

            email,

            password,

        });

        localStorage.setItem("token", data.token);

        setUser(data.user);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}