import React from 'react'
import { useNavigate } from 'react-router-dom';


function Homerots() {
  const naviaget= useNavigate();
  const changerouts=()=>{
    naviaget('/login')
  }
  const bodyStyle = {
    backgroundColor: '#f0f0f0'
  }
  
  return<>
  <button onClick={changerouts}>goto login page </button> 



  </>
}

export default Homerots;
