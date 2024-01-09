import React from 'react'
import Login from './Componets/Login';
import Register from './Componets/Register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
const App = () => {
  return (<>
  <h1>this is home page</h1>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='login'
            element={<Login />} />
          <Route path='register'
            element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div></>
  )
}

export default App;
