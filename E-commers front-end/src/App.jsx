import React, { useEffect, useState } from "react";
import Login from "./Componets/Login_registration/Login";
import RegistrationPage from "./Componets/Login_registration/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homerots from "./Componets/Navbar";
import "./App.css";
import AdProductForm from "./Componets/Products/AddProduct";
import { AppContext } from "./Context";
import Home from "./Componets/Home";
import ChangePasswordForm from "./Componets/Password/changepaswd";
import ShopingCard from "./Componets/Chekoutpage/ShopingCard";
const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  console.log("accesstoken", accessToken);
  console.log("user", user);

  useEffect(() => {
    const AccessToken = localStorage.getItem("accessToken");
    const User = localStorage.getItem("user");
    setAccessToken(AccessToken);
    setUser(User);
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{ accessToken, setAccessToken, user, setUser }}
      >
        <div>
          <BrowserRouter>
            <Homerots></Homerots>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/addproduct" element={<AdProductForm />} />
              <Route path="changePassword" element={<ChangePasswordForm />}>
                {" "}
              </Route>
              <Route path="shopingcard" element={<ShopingCard />}>
                {" "}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
