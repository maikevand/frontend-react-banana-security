import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const inlogData = {
            email,
            password
        };

        try {
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login",
                inlogData,
                {
                    headers: {
                        "novi-education-project-id": "d17b3fdb-9491-4065-b047-efe9ea4b773c"
                    }
                }
            );

            // console.log("Inloggen is gelukt", response.data);
            login(response.data.token);
        } catch (error) {
            console.error("Inloggen is mislukt");
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mailadres
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="E-mail"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label htmlFor="password">Wachtwoord
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Wachtwoord"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;