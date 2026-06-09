import {createContext, useState} from "react";
import { useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    function login() {
        setIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        setIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const authData = {
        isAuth,
        user: "M",
        login,
        logout
    };
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;