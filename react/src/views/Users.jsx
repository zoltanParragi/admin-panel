import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState()
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers()
  }, [])

  const onDelete = (u) => {
    if(!window.confirm("Biztos vagy benne, hogy törölni akarod ezt a felhasználót?")) {
      return
    }

    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      setNotification('A felhasználót sikeresen töröltük.')
      getUsers()
    })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
    .then(({data}) => {
      setLoading(false)
      setUsers(data.data)
      console.log(data.data)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  return (
    <div className="users">
      <div>
        <h1>Felhasználók</h1>
        <Link to='/users/new'><button className='btn btn-add' >Új felhasználó</button></Link>
      </div>
      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Név</th>
              <th>Email</th>
              <th>Létrehozva</th>
              <th>Tevékenység</th>
            </tr>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan={5}>Loading ...</td>
            </tr>
          </tbody>}
          {!loading && <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn btn-edit" to={'/users/' + u.id}>Módosít</Link>
                  &nbsp;
                  <button  className="btn btn-delete" onClick={e => onDelete(u)}>Töröl</button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  )
}
