import type { UserModel } from '../models/userModel'
import { Outlet, useNavigate } from 'react-router'
import "./Layout.css"

type Props = {
    currentUser: UserModel | null,
    onLogout: () => void
}

export default function Layout({currentUser, onLogout}: Props) {
    const navigate = useNavigate();


    return (
        <div className="Layout">
            <div className="Navigation">
                {currentUser ? (
                    <div className="UserProfile">
                        <div className="User">
                            <img src={currentUser.img_url} alt="Profile" />
                            <div className="Details">
                                <h2>{currentUser.name}</h2>
                                <p>{currentUser.bio}</p>
                                <p className='status'>{currentUser.status}</p>
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => navigate("/recipes/explore")}>Explore recipes</button>
                            <button onClick={() => navigate("/recipes/my")}>My recipes</button>
                            <button onClick={() => navigate("/recipes/publish")}>Publish a recipe</button>
                            {currentUser.role==='admin' && <button onClick={() => navigate("/users")}>Users</button>}
                            <button className={'logout'} onClick={() => onLogout()}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="UserProfile">
                        <h2>Guest</h2>
                        <div className="actions">
                            <button onClick={() => navigate("/login")}>Login</button>
                            <button onClick={() => navigate("/register")}>Register</button>
                            <button onClick={() => navigate("/recipes/explore")}>Explore</button>
                        </div>
                    </div>
                )}
            </div>

            <div className="MainContent">
                <Outlet />
            </div>
            
        </div>
    )
}
