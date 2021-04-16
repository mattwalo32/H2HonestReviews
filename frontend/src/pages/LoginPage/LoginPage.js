import { Button } from "antd";
import React, {useState } from "react";

import axios from 'axios';
const BASE_URL = "http://localhost:5000"

function LoginPage({onAuthChange}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogIn = async () => {
        const res = await axios.get(`${BASE_URL}/users?username=${username}&password=${hash(password)}`)
        if (!res.data.success)
            alert("Failed to log in:" + res.data.message)
        else
            onAuthChange(true)
    }

    const onSignUp = async () => {
        const res = await axios.post(`${BASE_URL}/users`, {username: username, password: hash(password)})
        if (!res.data.success)
            alert("Failed to create account: " + res.data.message)
        else
            alert("Account created")
    }

    const hash = function(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    };

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