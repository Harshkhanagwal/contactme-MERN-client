import React, { useContext, useState } from 'react'
import './Inputcontroller.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../store/auth'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [errMsg, SetErrMsg] = useState('')


    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const authContextValue = useContext(AuthContext);

    const { storeTokenInLS, userAuth } = authContextValue

    const handleInput = (e) => {

        const name = e.target.name
        const value = e.target.value

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const res = await fetch(`${process.env.FRONTEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('Login Successful')
                setUser({
                    email: "",
                    password: ""
                })

                storeTokenInLS(data.token);
                navigate("/")
            } else {
                SetErrMsg(data.error)
            }

        } catch (err) {
            console.log(err)
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div className="inptarea">
                    <label htmlFor={"email"}>Email</label>
                    <input type="email" name={"email"} placeholder={"Enter Your Email"} onChange={(e) => handleInput(e)} value={user.email} required />
                </div>

                <div className="inptarea">
                    <label htmlFor={"Password"}>Password</label>
                    <input type="Password" name={"password"} placeholder={"Create Password"} onChange={(e) => handleInput(e)} value={user.password} required />
                </div>

                {
                    errMsg ? (
                        <span className="errMsg">
                            **{errMsg}**
                        </span>
                    ) : ('')
                }

                <div className="inptarea">
                    <input type="submit" value={"Login"} />
                </div>

                <Link to={'/auth/registration'}>
                    <span className='formlink'>Create new Account</span>
                </Link>

            </form>
        </>
    )
}

export default Login