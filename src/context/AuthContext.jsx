import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function login(token) {
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        try {
            const userResponse = await axios.get(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`,
                {
                    headers: {
                        "novi-education-project-id": "d17b3fdb-9491-4065-b047-efe9ea4b773c",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(userResponse.data);
            setIsAuth(true);
            navigate("/profile");
        } catch (error) {
            localStorage.removeItem("token");
            console.error("Er ging iets mis", error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
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