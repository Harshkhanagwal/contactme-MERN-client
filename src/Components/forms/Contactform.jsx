import React, { useContext, useState } from 'react'
import './Inputcontroller.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { AuthContext } from '../../store/auth'

const Contactform = () => {

    const [userData, setUserData] = useState(true)

    const [msg, setMsg] = useState({
        username: "",
        email: "",
        message: ""
    })

    const authContextValue = useContext(AuthContext);

    const { user } = authContextValue

    if (userData && user){
        setMsg({
            username: user.username,
            email: user.email,
            message: ""
        })

        setUserData(false)
    }
    const handleInput = (e) => {

        const name = e.target.name
        const value = e.target.value

        setMsg({
            ...msg,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
            console.log("hii");
            const res = await fetch(`${process.env.FRONTEND_URL}/api/contact/contactmsg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(msg)
            })

            if (res.ok) {

                const data = await res.json()

                toast(data.msg)

                setMsg({
                    username: "",
                    email: "",
                    message: ""
                })

                userData(true)

            
            }

        } catch (err) {
            console.log(err)
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Send Message</h1>
                <div className="inptarea">
                    <label htmlFor={"username"}>Name</label>
                    <input type="text" name={"username"} placeholder={"Enter Your Name"} onChange={(e) => handleInput(e)} value={msg.username} required />
                </div>

                <div className="inptarea">
                    <label htmlFor={"email"}>Email</label>
                    <input type="email" name={"email"} placeholder={"Enter Your Email"} onChange={(e) => handleInput(e)} value={msg.email} required />
                </div>

                <div className="inptarea">
                    <label htmlFor={"message"}>Message</label>
                    <textarea  name={"message"} placeholder={"Write your message here"} onChange={(e) => handleInput(e)} value={msg.message} required />
                </div>

                <div className="inptarea">
                    <input type="submit" value={"Send Message"} />
                </div>


            </form>
        </>
    )
}

export default Contactform