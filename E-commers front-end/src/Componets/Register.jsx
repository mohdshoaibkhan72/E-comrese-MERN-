import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RegistrationPage = () => {
    const [registrationData,setRegistrationData] = useState({
        username:'',
        password:''
    })


const handleRegistrationChange = (e) => {
const {name,value} = e.target;

setRegistrationData((prevData) => ({
    ...prevData,
    [name] : value,
}))

}

const handleRegistrationSubmit = async(e) => {
e.preventDefault();
try{
    const response = await axios.post('http://localhost:8000/register',registrationData);
    console.log(response.data);
    alert("successfully register ");
}
catch(error){
    console.log(error)
    alert("somthing waints wrong")
}
setRegistrationData({
    username:'',
    password:'',
})
}

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card bg-light">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Registration Form</h2>
            <form onSubmit={handleRegistrationSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={registrationData.username}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={registrationData.password}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
              <p className="text-center">
                Already registered? <Link to="/login">Login Here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


  


export default RegistrationPage;