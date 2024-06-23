import React, { useContext, useEffect, useState } from 'react'
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../store/auth';

const Header = () => {
    const [nav, setNav] = useState(false)

    const authContextValue = useContext(AuthContext);

    const { isToken } = authContextValue



    return (
        <>
            <header className='main' >
                <div className="innerHeader container">
                    <span className="logo">ContactMe</span>

                    <button className='menuBT' onClick={() => setNav(!nav)}><CgMenuRight /></button>

                    <nav className={nav ? "show" : ''}>
                        <button className='menuBT closebt' onClick={() => setNav(!nav)}><CgClose /></button>

                        <NavLink to={'/'} className={"link"}>
                            <span className='nav-elm'>Home</span>
                        </NavLink >

                        <NavLink to={'/contact'} className={"link"}>
                            <span className='nav-elm'>Contact</span>
                        </NavLink>



                        {
                            isToken ? (
                                <Link to={'/auth/logout'} className='link' >
                                    <button className='auth-bt'>
                                        logout
                                    </button>
                                </Link>
                            ) : (
                                <Link to={'/auth/registration'} className='link' >
                                    <button className='auth-bt'>
                                        login / Register
                                    </button>
                                </Link>
                            )
                        }
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
