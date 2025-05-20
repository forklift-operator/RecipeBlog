import type { UserModel } from "../models/userModel"
import type { IdType } from "../types/commonTypes";
import "./UserCard.css"

type Props = {
    user: UserModel
    onDelete: (id: IdType) => Promise<void>;
    onEdit: (user:UserModel) => Promise<void>;
}

export default function UserCard({user,onEdit,onDelete}: Props) {
    const handleEditClick = async () => {
        await onEdit(user);
    }

    const handleDeleteClick = async () => {
        await onDelete(user.id);
    }
    
  return (
    <div className="UserCard">
        <img src={user.img_url} alt="User Image" />
        <div className="info">
            <h3>{user.name}</h3>
            <p>{user.status}</p>
            <p>Bio: {user.bio}</p>
        </div>
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>
            <span className="material-symbols-outlined">edit</span>
            </button>
            <button className="delete" onClick={handleDeleteClick}>
            <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    </div>
  )
}
