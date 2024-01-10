import React from 'react'
import Login from './Componets/Login';
import RegistrationPage from './Componets/Register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (<>
   <h1>hlw defalt page....</h1>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='login'
            element={<Login />} />
          <Route path='register'
            element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>

    </div></>
  )
}

export default App;
