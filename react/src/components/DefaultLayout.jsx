import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import NavBar from './NavBar'
import axiosClient from '../axios-client'

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to='/login' />

    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            <NavBar />
            <header>
                <div>Üdvözlünk, {user.name}!</div>
            </header>
            <main>
                {notification &&
                    <div className='notification'>
                        {notification}
                    </div>
                }
                <Outlet />
            </main>
        </>
    )
}
