import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [secrets, setSecrets] = useState([]);

    useEffect(() => {
        async function fetchSecrets() {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets",
                    {
                        headers: {
                            "novi-education-project-id": "d17b3fdb-9491-4065-b047-efe9ea4b773c",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setSecrets(response.data);
            } catch (error) {
                console.error("Secrets ophalen is mislukt", error);
            }
        }

        fetchSecrets();
    }, []);

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>

                {secrets.map((secret) => (
                    <article key={secret.id}>
                        <h3>{secret.title}</h3>
                        <p>{secret.content}</p>
                    </article>
                ))}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;