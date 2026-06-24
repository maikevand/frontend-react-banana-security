import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const registrationData = {
            email,
            password,
            roles: ["user"]
        };

        try {
            const response = await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/users",
                registrationData,
                {
                    headers: {
                        "novi-education-project-id": "d17b3fdb-9491-4065-b047-efe9ea4b773c"
                    }
                }
            );
            console.log("Registratie gelukt");
        } catch (error) {
            console.error("Registreren is mislukt");
        }

        console.log({
            email,
            password,
            username
        });
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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
                    <label htmlFor="username">Gebruikersnaam
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            placeholder="Gebruikersnaam"
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </label>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;