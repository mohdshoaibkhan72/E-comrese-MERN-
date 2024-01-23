import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homerots from "./Componets/Navbar";
import "./App.css";
import AdProductForm from "./Componets/Products/AddProduct";
import { AppContext } from "./Context";
import Home from "./Componets/Home";
import ChangePasswordForm from "./Componets/Password/changepaswd";
import ShopingCard from "./Componets/Chekoutpage/ShopingCard";
import Login from "./Componets/Login_registration/Login";
import RegistrationPage from "./Componets/Login_registration/Register";

const App = () => {
  // State variables
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);

  // Logging state variables for debugging
  console.log("accesstoken :-", accessToken);
  console.log("username :-", user);
  console.log("accountType :-", accountType);

  useEffect(() => {
    const AccessToken = localStorage.getItem("accessToken");
    const User = localStorage.getItem("user");
    const accountType = localStorage.getItem("account");
    setAccessToken(AccessToken);
    setUser(User);
    setAccountType(accountType);
  }, []);

  return (
    <>
      {/* AppContext.Provider provides state to all components within its hierarchy */}
      <AppContext.Provider
        value={{
          accessToken,
          setAccessToken,
          user,
          setUser,
          accountType,
          setAccountType,
        }}
      >
        <div>
          <BrowserRouter>
            <Homerots></Homerots>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<RegistrationPage />} />

              <Route path="/addproduct" element={<AdProductForm />} />

              <Route path="/changePassword" element={<ChangePasswordForm />} />

              <Route path="/shopingcard" element={<ShopingCard />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
