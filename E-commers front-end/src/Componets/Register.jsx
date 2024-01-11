import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
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
    // Check if the email or mobile number is already registered
    const existingUserEmail = await axios.get(`http://localhost:8000/check-email/${registrationData.email}`);
  
    if (existingUserEmail.data.exists) {
      alert("Email already registered");
      return;
    }

   

    // If not registered, proceed with the registration
    const response = await axios.post("http://localhost:8000/register", registrationData);
    console.log(response.data);
    alert("Successfully registered");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }

  // Reset the registrationData after submission
  setRegistrationData({
    fullName: "",
    username: "",
    password: "",
    email: "",
    mobileNumber: "",
  });
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registration Form</h2>
              <form onSubmit={handleRegistrationSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    value={registrationData.fullName}
                    onChange={handleRegistrationChange}
                    required
                  />
                </div>
                <div className="mb-3">
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
                <div className="mb-3 input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={registrationData.password}
                    onChange={handleRegistrationChange}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="mobileNumber"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="mobileNumber"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
