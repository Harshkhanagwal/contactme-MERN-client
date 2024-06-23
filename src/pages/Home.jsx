import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/auth';
import Loader from '../Components/Loader/Loader';

const Home = () => {

  
  return (
    <>

      <main className="main">
        <section className="herosection container">
          <h1>Let's Connect</h1>
          <p>with our MERN contact me application</p>

          <button className='contactbtn'>
            Send Message
          </button>
        </section>
        <section className="aboutsection container">
          <div className="about-content">
            <h2>About</h2>
            <p>This is an basic MERN application with functionality of login/singup, Admin pannel & CURD operations like : send message, delete user, create account etc </p>
          </div>
        </section>
      </main>

    </>
  )
}

export default Home