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
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8000/changePassword",
        {
          email,
          newPassword,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password is updated");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error changing password. Please try again.");
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
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="submit"
              className="btn btn-primary btn1"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <div className="drops">
            {[1, 2, 3, 4, 5].map((drop) => (
              <div key={drop} className={`drop drop-${drop}`}></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
