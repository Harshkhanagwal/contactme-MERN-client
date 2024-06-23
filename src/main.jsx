import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
    <div className='toast'>

      <ToastContainer position="bottom-right" closeOnClick autoClose={3000}  />
    </div>
  </AuthProvider>
)
