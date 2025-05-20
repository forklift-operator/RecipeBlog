import { useEffect } from 'react';
import type { UserModel } from '../models/userModel'
import UserCard from './UserCard';
import type { IdType } from '../types/commonTypes';


type Props = {
    users: UserModel[];
    onGetUsers: () => Promise<void>;
    onDelete: (userId:IdType) => Promise<void>
    onEdit: (user: UserModel) => Promise<void>
}

export default function UsersPage({users, onGetUsers, onDelete, onEdit}: Props) {
    useEffect(() => {
        const fetchUsers = () => {
            onGetUsers();
        }
        fetchUsers();
    }, [])
    
  return (
    <div className='UsersPage section'>
        <h1>Users</h1>
        {users.map((user, id) => (
            <UserCard key={id} user={user} onDelete={onDelete} onEdit={onEdit}/>
        ))}
    </div>
  )
}
