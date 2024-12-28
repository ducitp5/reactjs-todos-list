import React from "react";
import { useLocation } from "react-router-dom";

function About() {
    const location = useLocation();

    return (
        <div>
            <h1>About Page</h1>
            <p>Current Path: {location.pathname}</p>
        </div>
    );
}

export default About;
