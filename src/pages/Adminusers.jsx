import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from '../store/auth';
import Loader from '../Components/Loader/Loader';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import Editmodel from '../Components/admin/Editmodel';

const Adminusers = () => {

  const authContextValue = useContext(AuthContext);

  const { token, user } = authContextValue

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const [model, setModel] = useState(false)
  const [editdata, setEditdata] = useState("")

  const deleteUser = async (id) => {
    try {
      console.log(id)
      const res = await fetch(`${process.env.FRONTEND_URL}/api/admin/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();


      if (res.ok) {
        toast.success(data.message);
        getAllusers()
      } else {
        throw new Error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error Deleting user:', error);

    }
  };


  const getAllusers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.FRONTEND_URL}/api/admin/getallusers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (res.ok) {
        setUsers(data)
        setLoading(false)
      }
    } catch (error) {

      setLoading(false)
    }
  }

  const handleEdit = (data) => {
    setModel(true)
    setEditdata(data)
  }

  useEffect(() => {

    getAllusers()

  }, [])


  return (
    <>
      <h1>Users</h1>
      <div className="tablearea">

        <table>

          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>isAdmin</th>
            <th>Edit details</th>
            <th>Delete</th>
          </tr>
          {
            loading ? <tbody> <Loader /></tbody> : (
              <>

                {
                  users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td className='email'>{user.email}</td>
                        <td>{user.isAdmin ? "Yes" : "No"}</td>
                        <td><button className='edit' onClick={() => handleEdit(user)}><FaRegEdit /> Edit</button></td>
                        <td><button className={user.isAdmin ? "delete disabled" : 'delete'} onClick={() => {
                          user.isAdmin ? (
                            toast.error("Can't delete Admin")
                          ) : deleteUser(user._id)
                        }} ><RiDeleteBin6Line /> Delete</button></td>
                      </tr>
                    )
                  })
                }
              </>

            )
          }


        </table>
      </div>
      {
        model ? <Editmodel data={editdata} close={setModel} refreshData={getAllusers} /> : ''
      }


    </>
  )
}

export default Adminusers