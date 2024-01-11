import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  //submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', loginData);
      const success = response.data;
      if (success) {
        alert("done bro jaou maouj kro..")
        window.location.href='http://localhost:5173/';
      } else {
      
        console.log('Unsuccessful login');
        alert('Invalid username or password');
      }
    } catch (error) {
      alert("use correct username")
      console.error('Login error:', error.message);
    }
    
    setLoginData({
      username: '',
      password: '',
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleLoginSubmit}>
          <p>Welcome</p>
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
          <br />
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <br />
          <button
            type="button"
            className="btn btn-primary btn1 "
            onClick={toggleShowPassword}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </button>
          <button type="submit" className="btn btn-primary btn1">
            Submit
          </button>
          <br />
          <a href="#">Forgot Password?</a>
          <a className="text-center">
            Not registered yet? <Link to="/register">Register Here</Link>
          </a>
        </form>

        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;