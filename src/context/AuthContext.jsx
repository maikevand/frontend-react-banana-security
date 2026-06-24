import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function login() {
        setIsAuth(true);
        setUser("M");
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        setIsAuth(false);
        setUser(null);

        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const authData = {
        isAuth,
        user,
        login,
        logout
    };
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;