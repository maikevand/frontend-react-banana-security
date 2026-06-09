import React from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    console.log(auth);

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

            <div>
                {auth.isAuth ? (
                    <button type="button" onClick={auth.logout}>Log uit</button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate('/signin')}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                        >
                            Registreren
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;