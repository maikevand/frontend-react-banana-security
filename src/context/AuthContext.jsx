import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Context wordt gerefresht!");

        async function refreshContext() {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;

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
                    toggleIsAuth(true);
                    setStatus("done");
                } catch (error) {
                    localStorage.removeItem("token");
                    setUser(null);
                    toggleIsAuth(false);
                    setStatus("done");

                    console.error("Context herstellen is mislukt", error);
                }
            } else {
                setUser(null);
                toggleIsAuth(false);
                setStatus("done");
            }
        }

        refreshContext();
    }, []);

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
            toggleIsAuth(true);
            setStatus("done");
            navigate("/profile");
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
            toggleIsAuth(false);
            setStatus("done");
            console.error("Er ging iets mis", error);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        toggleIsAuth(false);
        setUser(null);
        setStatus("done");

        console.log("Gebruiker is uitgelogd!");
        navigate("/");
    }

    const authData = {
        isAuth,
        user,
        status,
        login,
        logout
    };
    return (
        <AuthContext.Provider value={authData}>
            {status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;