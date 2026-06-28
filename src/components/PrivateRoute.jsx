import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

function PrivateRoute({children}) {
    const {isAuth} = useContext(AuthContext);

    if (isAuth) {
        return children;
    }

    return <Navigate to="/signin"/>;
}

export default PrivateRoute;
