import React, { useState } from "react"
import { useNavigate } from "react-router";

type Props = {
    onLogin: (username: string, password: string) => Promise<boolean>
}

export default function LoginForm({ onLogin }: Props)  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (await onLogin(username, password)) {
                navigate('/recipes');
            }
        } catch (e) {
            console.error((e as Error).message);
        }
        
    }

    return (
        <div className="LoginForm section">
            <form onSubmit={handleSubmit}>
                <h1 className="mb-4">Login</h1>
                <input value={username} type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} required/>
                <input value={password} type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}