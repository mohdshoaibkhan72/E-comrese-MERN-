import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Componets/Navbar";
import "./App.css";
import AdProductForm from "./Componets/Products/AddProduct";
import { AppContext } from "./Context";
import Home from "./Componets/Home";
import ChangePasswordForm from "./Componets/Password/changepaswd";
import ShopingCard from "./Componets/Chekoutpage/ShopingCard";
import Login from "./Componets/Login_registration/Login";
import RegistrationPage from "./Componets/Login_registration/Register";
import UpdateProduct from "./Componets/Products/UpdateProduct";

const App = () => {
  // State variables
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userString = localStorage.getItem("user");
    const parsedUser = userString ? JSON.parse(userString) : null;

    // Set the access token
    setAccessToken(accessToken);

    if (parsedUser) {
      // Set the user state and accountType state
      setUser(parsedUser);
      setAccountType(parsedUser.accountType);
    }
  }, []);

  return (
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
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/addproduct" element={<AdProductForm />} />
            <Route path="/changePassword" element={<ChangePasswordForm />} />
            <Route path="/shopingcard" element={<ShopingCard />} />

            <Route
              path="/updateProduct/:productId"
              element={<UpdateProduct />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
};

export default App;
