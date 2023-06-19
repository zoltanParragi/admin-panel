import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function UserForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('A felhasználót sikeresen módosítottuk.')
                    navigate('/users')
                })
                .catch(error => {
                    const response = error.response
                    if (response && response.status === 422) { //422 - validation error
                        console.log(response.data.errors)
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    setNotification('A felhasználó sikeresen létrejött.')
                    navigate('/users')
                })
                .catch(error => {
                    const response = error.response
                    if (response && response.status === 422) { //422 - validation error
                        console.log(response.data.errors)
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='userForm'>
            {user.id && (<div>
                <h1>Felhasználó adatainak módosítása:</h1>
                <h2> {user.name}</h2>
            </div>)}
            {!user.id && <h1>Új felhasználó rögzítése</h1>}
            <div className='card'>
                {loading && (<div>Loading ...</div>)}
                {errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input type="text" name='name' placeholder='Név' value={user.name} onChange={e => handleChange(e)} />
                        <input type="email" name='email' placeholder='Email' value={user.email} onChange={e => handleChange(e)} />
                        <input type="password" name='password' placeholder='Jelszó' onChange={e => handleChange(e)} />
                        <input type="password" name='password_confirmation' placeholder='Jelszó mégeygszer' onChange={e => handleChange(e)} />
                        <button className='btn btn-edit'>Mentés</button>
                    </form>
                }
            </div>
        </div>
    )
}
