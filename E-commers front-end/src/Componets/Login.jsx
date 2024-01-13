import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "", });
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => { setShowPassword((prevShowPassword) => !prevShowPassword); };

  //submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", loginData);
      const success = response.data;
     console.log(success);
      if (success) {

        
        toast.success("Login successful!");
        //use navigate...her     
      localStorage.setItem("accessToken",success.accessToken)
      localStorage.setItem("user",JSON.stringify(success.user))
      navigate('/');
      }
      else {
        toast.info("incorect user name and password");
      }
    } catch (error) {
     
      toast.error(error.response.data.message);

    }
    
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value, }));
  };

  return (
    <>
      <div className="body">
        <div className="container">
          <form onSubmit={handleLoginSubmit}>
            <p>Welcome</p>
            <input type="email" className="form-control" id="email" name="email" placeholder="email" value={loginData.email} onChange={handleLoginChange} required />

            <div className="mb-3 input-group">
              <input type={showPassword ? "text" : "password"}
                className="form-control bg-light text-dark"
                id="password"
                name="password"

                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button
                className="btn btn-primary btn1"
                type="button"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type="submit" className="btn btn-primary btn1">
              Submit
            </button>

            <br />
            <a href="#">Forgot Password?</a>
            <br />
            <a className="text-center">Not registered yet?</a>
            <Link to="/register">Register Here</Link>
          </form>

          <div className="drops">
            <div className="drop drop-1"></div>
            <div className="drop drop-2"></div>
            <div className="drop drop-3"></div>
            <div className="drop drop-4"></div>
            <div className="drop drop-5"></div>
          </div>
        </div></div>
      <ToastContainer />
    </>
  );
};

export default LoginPage;
