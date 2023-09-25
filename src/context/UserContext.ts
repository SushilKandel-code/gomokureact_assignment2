import { createContext} from 'react'
import {User} from './../types/User';

type UserContextType ={
    user?: User
    login: (username: string, password: string)=> Promise<true | string>
    register: (username: string, passwrod: string)=> Promise<true | string>
    logout: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext