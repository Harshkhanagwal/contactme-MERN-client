import React, { useContext, useEffect, useState } from 'react'
import './admin.css'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
const Adminlayout = () => {

    const [active, setActive] = useState(' ')

    const authContextValue = useContext(AuthContext);

    const { user,isLoading } = authContextValue

    const navigate = useNavigate()

    if(isLoading){
        return <Loader/>
    }

    if(!user.isAdmin){
        navigate('/')
        toast.error("Access Denied")
    }



    return (
        <>
            <main>
                <div className="adminlayout container">
                    <div className="linkarea">
                        <Link to={'/admin/users'}>
                            <button className={active === true ? 'activebt' : ''} onClick={() => setActive(true)}>Users</button>
                        </Link>
                        <Link to={'/admin/contacts'}>
                            <button className={active ? '' : 'activebt'} onClick={() => setActive(false)}>Messages</button>
                        </Link>
                    </div>
                    <div className='admin-content'>
                        <Outlet />
                    </div>
                </div>
            </main>

        </>
    )
}

export default Adminlayout