import { User, Credential } from './../types/User'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import { API_HOST } from '../constants' 
import { post, setToken } from '../utils/http'

type UserProviderProps = {
    children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {

    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)  
    if (user) {
        setToken(user.token)
    }
    const login = async (username: string, password: string) => { 
        try {
            const user = await post<Credential, User>(`${API_HOST}/api/auth/login`, {
                username,
                password,
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to login.'
        }
    }

    const register = async (username: string, password: string) => { 
        try {
            const user = await post<Credential, User>(`${API_HOST}/api/auth/register`, {
                username,
                password,
            })
            setUser(user)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to register.'
        }
    }

    const logout = () => {
        setUser(undefined)
        setToken('')
    }

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )
}