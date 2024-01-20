import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../../Context";

const ChangePasswordForm = () => {
  const { accessToken } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8000/changePassword",
        {
          email: email,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast("Password is updated");
      } else {
        toast("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast("Error changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="body">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <p>Welcome</p>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              onChange={handlePasswordChange}
              required
            />
            <button type="submit" className="btn btn-primary btn1" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
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
    </>
  );
};

export default ChangePasswordForm;
