import { Button } from "antd";
import React, {useState } from "react";

function LoginPage({onAuthChange}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogIn = () => {
        // TODO: Send the request to the backend
        // TODO: Set true if they are authenticated, false if not
        onAuthChange(true)
    }

    const onSignUp = () => {
        // TODO: Send the request to the backend
        // TODO: Set true if successful sign up, false otherwise
        onAuthChange(true)
    }

    return (
        <div style={{display:"flex", flexDirection: "column", width: 300}}>
            <h1>Log In / Sign Up</h1>
            <form style={{display:"flex", flexDirection: "column"}}>
                <label>
                    Username:
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="name" />
                </label>
                <label>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="name" />
                </label>

                <div style={{display: "flex"}}>
                <Button onClick={onLogIn}>Log In</Button>
                <Button onClick={onSignUp}>Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;