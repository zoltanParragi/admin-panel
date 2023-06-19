import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import NavBar from './NavBar'

export default function GuestLayout() {
    const { user, token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}


/* import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import NavBar from './NavBar'

export default function GuestLayout() {
    const {token} = useStateContext()
    console.log("G")
    console.log(token)

    if(token) {
        <Navigate to='/users' />
    }

    return (
        <>
        <NavBar/>
        <div>
            GuestLayout
            <Outlet />
        </div>
        </>
    )
} */
