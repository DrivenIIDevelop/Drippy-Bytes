import { useState, createContext } from "react";
import ProjectPulseApi from "../api/api";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (inputs) => {
        const res = await ProjectPulseApi.login(inputs);
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
