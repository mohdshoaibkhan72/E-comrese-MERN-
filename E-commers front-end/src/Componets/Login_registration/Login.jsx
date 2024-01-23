import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../Context";

const LoginPage = () => {
  const { setAccessToken, setUser, setAccountType } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const accessTokens = localStorage.getItem("accessToken");

  React.useEffect(() => {
    if (accessTokens || user) {
      navigate("/");
    }
  });

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
        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user.name));
        localStorage.setItem("account", user.accountType);
        // localStorage.setItem("accountType", user.accountType);

        // Set tokens and account type in context
        setAccessToken(accessToken);
        setUser(user.name);
        setAccountType(user.accountType);
        console.log("account type", user.accountType);
        // Redirect to the home page after successful login
        navigate("/");
      } else {
        toast.info("Incorrect username and password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoginData({ email: "", password: "" });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <AppContext.Provider value={{ setAccountType }}>
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
