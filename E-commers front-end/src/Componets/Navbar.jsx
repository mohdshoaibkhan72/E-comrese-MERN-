import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfo, FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../Context";

function Navbar() {
  const navigate = useNavigate();
  const { user, accountType } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  function Logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item list">
              <Link className="nav-link" to="/">
                <FaHome className="me-2" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaInfo className="me-2" />
                About
              </Link>
            </li>
            <li className="nav-item">
              {accountType === "seller" ? (
                <Link className="nav-link" to="/addproduct">
                  Add product
                </Link>
              ) : null}
            </li>
            <li className="nav-item">
              {accountType === "user" ? (
                <Link className="nav-link" to="/shopingcard">
                  <FaShoppingCart className="me-2 " />
                  Cart
                </Link>
              ) : null}
            </li>
          </ul>
        </div>
        <div
          className={`ms-auto ${
            accessToken ? "d-flex align-items-center" : "mx-auto"
          }`}
        >
          {accountType ? (
            <div className="me-4 text-white">Account Type: {accountType}</div>
          ) : null}
          {accessToken ? (
            <>
              {user ? (
                <>
                  <div
                    className="card me-4"
                    style={{ width: "auto", height: "auto" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Welcome, {user.name}!</h5>
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={Logout}>
                    Logout
                  </button>
                  <Link to="/changepassword">
                    <button className="btn btn-primary">changePassword</button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
