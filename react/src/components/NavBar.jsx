import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function NavBar() {
  const { token, setUser, setToken } = useStateContext()

  const onLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }
  return (
    <nav>
      
      <div><Link to="/">Kezdőoldal</Link></div>
      <ul>
        {!token && <li><Link to="/login">Belépés</Link></li>}
        {!token && <li><Link to="/register">Regisztráció</Link></li>}

        {token && <li><Link to="/users">Admin panel</Link></li>}
        {token && <li><Link to="/dashboard">Profilom</Link></li>}
        {token && <li><a href='#' onClick={onLogout} className='btn-logout'>Kilépés</a></li>}
      </ul>
    </nav>
  )
}
