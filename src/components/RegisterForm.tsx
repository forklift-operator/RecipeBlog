import React, { useState } from 'react'
import { UserModel } from '../models/userModel'
import { useNavigate } from 'react-router';

type Props = {
    onRegister: (user: UserModel) => Promise<boolean>
}

export default function RegisterForm({ onRegister }: Props) {
    const [user, setUser] = useState<UserModel>({} as UserModel);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = new UserModel(user);
        
        if (!UserModel.validateUsername(newUser.username) || !UserModel.validatePassword(newUser.password)) {
            alert("Username or password does not meet the criteria");
            return;
        }
        try {
            if (await onRegister(newUser)) {
                navigate('/');
            }
        } catch (e) {
            console.error((e as Error).message);
        }
    }
    
  return (
    <div className='RegiserForm section'>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" placeholder='Name' onChange={e => setUser({...user, name: e.target.value})} required/>
            <input type="text" placeholder='Username' onChange={e => setUser({...user, username: e.target.value})} required/>
            <input type="text" placeholder='Password' onChange={e => setUser({...user, password: e.target.value})} required/>
            <select onChange={e => setUser({...user, gender: e.target.value})} required>
                <option value="" disabled>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="neutral">I preffer not to say</option>
            </select>
            <input type="text" placeholder='Profile Pic (url)' onChange={e => setUser({...user, img_url: e.target.value})}/>
            <input type="text" placeholder='Bio (max 512 characters)' maxLength={512} onChange={e => setUser({...user, bio: e.target.value})}/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}
