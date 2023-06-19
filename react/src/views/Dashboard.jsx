import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'

export default function Dashboard() {
  const { user, setUser } = useStateContext()
  const { setNotification } = useStateContext()
  const [errors, setErrors] = useState(null);

  const [userProfile, setUserProfile] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    setUserProfile({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  }, [user])

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    axiosClient.put(`/users/${userProfile.id}`, userProfile)
      .then(() => {
        setNotification('Az adataid módosítása megtörtént.')
      })
      .catch(error => {
        const response = error.response
        if (response && response.status === 422) { //422 - validation error
          setErrors(response.data.errors)
        }
      })

      setUser({
        ...user,
        name: userProfile.name,
        email: userProfile.email,
      })
  }

  return (
    <div className='dashboard'>
      <h1>Profilom</h1>
      {errors && <div className='alert'>
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }
      <form className='card' onSubmit={onSubmit}>
        <input type="text" name="name" id="name" value={userProfile.name} onChange={e => handleChange(e)} placeholder="Név"/>
        <input type="email" name="email" id="email" value={userProfile.email} onChange={e => handleChange(e)} placeholder="Email"/>
        <input type="password" name="password" id="password" onChange={e => handleChange(e)} placeholder="Jelszó"/>
        <input type="password" name="password_confirmation" id="password_confirmation" onChange={e => handleChange(e)} placeholder="Jelszó mégegyszer"/>
        <button className='btn btn-edit'>Mentés</button>
      </form>
    </div>
  )
}
