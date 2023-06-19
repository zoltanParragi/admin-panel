import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function Register() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setToken, setUser } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        axiosClient.post('/register', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(error => {
                const response = error.response
                if (response && response.status === 422) { //422 - validation error
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className='register'>
            <form className='card' onSubmit={onSubmit}>
                <h1>Regisztráció</h1>
                {errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                <input ref={nameRef} type="text" name="name" placeholder='Név' />
                <input ref={emailRef} type="email" name="email" placeholder='Email' />
                <input ref={passwordRef} type="password" name="password" placeholder='Jelszó' />
                <input ref={passwordConfirmationRef} type="password" name="password_confirmation" placeholder='Jelszó mégegyszer' />
                <button className='btn btn-edit'>Küldés</button>
                <p>Regisztráltál már? <Link to='/login'>Belépés</Link></p>
            </form>
        </div>
    )
}
