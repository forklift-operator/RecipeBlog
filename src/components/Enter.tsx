import type { UserModel } from "../models/userModel"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

type Props = {
    onLogin: (username: string, password: string) => void
    onRegister: (user: UserModel) => void
}

export default function Enter({onLogin, onRegister}: Props) {
  return (
    <div className='Enter'>
        <LoginForm onLogin={onLogin}/>
        <RegisterForm onRegister={onRegister}/>
    </div>
  )
}
