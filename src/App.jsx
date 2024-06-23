import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './Components/Header/Header'
import Auth from './pages/Auth'
import Loginauth from './pages/Loginauth'
import Logout from './pages/Logout'
import Adminlayout from './Components/admin/Adminlayout'
import Admincontacts from './pages/Admincontacts'
import Adminusers from './pages/Adminusers'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/auth/registration' element={<Auth/>} />
          <Route path='/auth/login' element={<Loginauth/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/auth/logout' element={<Logout/>} />
          <Route path='/' element={<Contact/>} />
          <Route path='/admin' element={<Adminlayout/>}>
            <Route path='contacts' element={<Admincontacts/>} />
            <Route path='users' element={<Adminusers/>} />
          </Route>
        </Routes>
        <footer>
          Developed with 💖 by Harsh khanagwal
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
