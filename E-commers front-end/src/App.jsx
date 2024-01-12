import React from 'react'
import Login from './Componets/Login';
import RegistrationPage from './Componets/Register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homerots from './Componets/homerots';
import './App.css'
const App = () => {
  return (<>
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='login'
            element={<Login />} />
          <Route path='register'
            element={<RegistrationPage />} />
          <Route path='home'
            element={<Homerots />} />
        </Routes>
      </BrowserRouter>

    </div></>
  )
}

export default App;
