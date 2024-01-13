import React from 'react'
import Login from './Componets/Login';
import RegistrationPage from './Componets/Register';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homerots from './Componets/homerots';
import './App.css'
import AdProductForm from './Componets/Addproduct/addproduct';
const App = () => {


  return (<>
  
    <div>
    
      <BrowserRouter>
        <Routes>
          <Route path='login'
            element={<Login />} />
          <Route path='register'
            element={<RegistrationPage />} />
          <Route path='/'
            element={<Homerots/>} />
          <Route path='/addproduct'element={<AdProductForm/>}/> 
        </Routes>
      </BrowserRouter>

    </div></>
  )
}

export default App;
