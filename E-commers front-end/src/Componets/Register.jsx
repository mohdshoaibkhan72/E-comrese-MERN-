import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegistrationPage = () => {
  const { accessToken, setAccessToken, user, setUser } = useContext(AppContext);
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    mobileNumber: "",
  });
  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:8000/register", registrationData);
      const success = response.data;
      console.log(success.data);
      toast.success("Regisrer successful!");


    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return <>
    <div className="body">
      <div className="container ">
        <div>
          <div className="col-md-6">
            <div className="text-dark">
              <div className="">

                  <form onSubmit={handleRegistrationSubmit}>
                    <p>Registraio Form</p>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control bg-light text-dark"
                        id="fullName"
                        name="fullName"
                        placeholder="Full Name"
                        value={registrationData.fullName}
                        onChange={handleRegistrationChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control bg-light text-dark"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={registrationData.username}
                        onChange={handleRegistrationChange}
                        required
                      />
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control bg-light text-dark"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={registrationData.password}
                        onChange={handleRegistrationChange}
                        required
                      />
                      <button
                        className="btn btn-primary btn1"
                        type="button"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control bg-light text-dark"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={registrationData.email}
                        onChange={handleRegistrationChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control bg-light text-dark"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={registrationData.mobileNumber}
                        onChange={handleRegistrationChange}
                        required
                      />

                    </div>
                    <div className="text-center mb-3">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
                    <p className="text-center">
                      Already registered? <Link to="/login">Login Here</Link>
                    </p>
                  </form>
                  <div className="drops">
                    <div className="drop drop-1"></div>
                    <div className="drop drop-2"></div>
                    <div className="drop drop-3"></div>
                    <div className="drop drop-4"></div>
                    <div className="drop drop-5"></div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div></div>
    }
  </>
};

export default RegistrationPage;
