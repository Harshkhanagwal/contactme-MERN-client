import React, { useContext, useState } from 'react'
import './Inputcontroller.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../store/auth'

import { toast } from 'react-toastify';


const Registration = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [errMsg, SetErrMsg] = useState('')

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
                const res = await fetch(`${process.env.FRONTEND_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await res.json()
            console.log(data)

            if (res.ok) {
                setUser({
                    username: "",
                    email: "",
                    password: ""
                })
                
                storeTokenInLS(data.token);
                toast.success(data.msg)
                navigate('/')
                

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
                <h1>Registration Form</h1>
                <div className="inptarea">
                    <label htmlFor={"username"}>Name</label>
                    <input type="text" name={"username"} placeholder={"Enter Your Name"} onChange={(e) => handleInput(e)} value={user.name} required />
                </div>

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
                    <input type="submit" value={"Create Account"} />
                </div>



                <Link to={'/auth/login'}>
                    <span className='formlink'>Already Have account ? Login here</span>
                </Link>

            </form>
        </>
    )
}

export default Registration