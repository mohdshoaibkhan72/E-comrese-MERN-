import React from 'react'
import { useNavigate } from 'react-router-dom';



function Homerots() {
  const naviaget= useNavigate();
  const changerouts=()=>{
    naviaget('/login')
  }
  return (
  <>
  <center> 
     <button onClick={changerouts}>goto login page </button> 
  </center>


  </>
  )
}

export default Homerots;
