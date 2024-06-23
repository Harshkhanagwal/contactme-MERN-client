import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../store/auth';
import { Navigate } from 'react-router-dom';

const Logout = () => {

    // const navigate = useNavigate()
    const authContextValue = useContext(AuthContext);

    const {Logoutuser, setUser} = authContextValue

    useEffect(() => {
        Logoutuser()
        setUser("")
    },[Logoutuser, setUser])

    return <Navigate to='/auth/login'></Navigate>
}

export default Logout