import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../Context";

const LoginPage = () => {
  const { setAccessToken, setUser, setAccountType } = useContext(AppContext);

  const navigate = useNavigate();

  // Initialize state for user and accountType
  const [userState, setUserState] = useState(null);
  const [accountTypeState, setAccountTypeState] = useState(null);

  useEffect(() => {
    // Check if user and accountType are available in state
    if (userState || accountTypeState) {
      navigate("/");
    }
  }, [userState, accountTypeState, navigate]);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        loginData
      );

      const { accessToken, user } = response.data;

      if (accessToken) {
        // Set user and accountType in component state
        setUserState(user);
        setAccountTypeState(user.accountType);

        // Set tokens in context
        setAccessToken(accessToken);
        setUser(user);
        setAccountType(user.accountType);

        // Store user object and access token in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);

        // Redirect to the home page after successful login
        navigate("/");
      } else {
        toast.info("Incorrect username and password");
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error
        toast.error(
          `Error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made, but no response was received
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An unexpected error occurred");
      }
    }

    setLoginData({ email: "", password: "" });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <>
      <AppContext.Provider value={{ setAccountType, setUser }}>
        <div className="body">
          <div className="container">
            <form onSubmit={handleLoginSubmit}>
              <p>Welcome</p>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />

              <div className="mb-3 input-group">
                <input
                  type={showPassword ? "text" : "password"}
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
              <Link to="/forgot-password">Forgot Password?</Link>
              <br />
              <p className="text-center">Not registered yet?</p>
              <Link to="/register">Register Here</Link>
            </form>

            <div className="drops">
              <div className="drop drop-1"></div>
              <div className="drop drop-2"></div>
              <div className="drop drop-3"></div>
              <div className="drop drop-4"></div>
              <div className="drop drop-5"></div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </AppContext.Provider>{" "}
    </>
  );
};

export default LoginPage;
