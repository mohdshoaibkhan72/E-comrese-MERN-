import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })


  //submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      const succes = (response.data);
      if (succes) {
        console.log("login seccesfull");
        alert("succesfull login")
      } else {
        console.log("unsecces")
      }

    } catch (error) {
      console.error('Login error:', error.message);
    }

    setLoginData({
      username: '',
      password: ''
    });
  };


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  return  <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card bg-light">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
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
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="text-center mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <p className="text-center">
              Not registered yet? <Link to='/register'>Register Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

};

export default LoginPage

