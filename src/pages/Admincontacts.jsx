import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/auth';
import Loader from '../Components/Loader/Loader';
import { toast } from 'react-toastify';

const Admincontacts = () => {

    const authContextValue = useContext(AuthContext);

    const { token } = authContextValue

    const [loading, setLoading] = useState(false)
    const [contacts, setContacts] = useState([])


    const getallcontacts = async () => {
        try {
            setLoading(true)
            const res = await fetch(`${process.env.FRONTEND_URL}/api/admin/getallcontacts`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()
            if (res.ok) {
                setContacts(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)

        }
    }

    const deletecontact = async (id) => {
        try {
          console.log(id)
          const res = await fetch(`${process.env.FRONTEND_URL}/api/admin/deletecontact/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    
          const data = await res.json();
    
    
          if (res.ok) {
            toast.success(data.message);
            getallcontacts()
          } else {
            throw new Error(data.message || 'Failed to delete user');
          }
        } catch (error) {
            toast.error('Something went wrong');
        }
      };

    useEffect(() => {
        getallcontacts()
    }, [])

    return (
        <>
            <h1>Messages</h1>

            <div className="messagebxgrid">

                {
                    contacts.length === 0 ? <h2>Messages list is empty</h2> : ''
                }
                {
                    contacts.length > 0 && loading ? <div className='loaderarea'> <Loader /> {
                    } </div> : (
                        <>
                            {
                                contacts.map((msg, index) => {
                                    return (
                                        <div className="msgbx" key={index}>
                                            <h4>From : {msg.email}</h4>
                                            <p>
                                                {msg.message}
                                            </p>
                                            <p> <i>by-{msg.username}</i></p>

                                            <button onClick={() => deletecontact(msg._id)}>Delete</button>
                                        </div>

                                    )
                                })

                            }

                        </>
                    )
                }

            </div>
        </>
    )
}

export default Admincontacts