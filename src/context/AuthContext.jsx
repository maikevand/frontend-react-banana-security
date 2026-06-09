import {createContext} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
const authData = {
isAuth: true,
    user: "M"
};
    return (
        <AuthContext.Provider value={authData}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;