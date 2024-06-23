import React, { useContext, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AuthContext } from '../../store/auth';
import { toast } from 'react-toastify';

const Editmodel = (props) => {
  const [user, setUserr] = useState(props.data);
  const [errMsg, SetErrMsg] = useState('');

  const authContextValue = useContext(AuthContext); // Use useContext here to access AuthContext
  const { token } = authContextValue;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(props.data._id)
    try { 
      const res = await fetch(`https://contactme-mern-backend.onrender.com/api/admin/updateuser/${props.data._id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      if (res.ok) {
        props.close(false);
        toast.success(data.message);
        props.refreshData()
      } else {
        SetErrMsg(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserr({
      ...user,
      [name]: value
    });

  };

  return (
    <>
      <div className="editmodelarea">
        <form onSubmit={handleSubmit}>
          <button className="close-model" onClick={() => props.close(false)}>
            <IoClose />
          </button>
          <h2>Edit User Details</h2>

          <div className="inptarea">
            <label htmlFor="username">Name</label>
            <input type="text" name="username" placeholder="Enter Your Name" value={user.username} onChange={handleInput} required />
          </div>

          <div className="inptarea">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Enter Your Email" value={user.email} onChange={handleInput} required />
          </div>

          {errMsg && <span className="errMsg">{errMsg}</span>}

          <div className="inptarea">
            <input type="submit" value="Update User" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Editmodel;
