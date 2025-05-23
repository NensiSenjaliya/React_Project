import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL="http://localhost:5000/api/user";
const Profile = () => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    console.log("Stored Username:", storedUsername);
    console.log("Stored Email:", storedEmail);
    setUsername(storedUsername);
    setEmail(storedEmail);
  }, []);

  const handleUpdateProfile = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      showMessage("error", "User not found!");
      return;
    }

    const updatedData = { name, email, password };

    console.log("Updated Data:", updatedData); // Check if email is correctly passed

    try {
      const response = await fetch(
       `${API_URL}/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        showMessage("success", result.message ||"✅ Profile updated successfully!");
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        setTimeout(() => {
          navigate("/user-panel", { replace: true });
        }, 2000);
      } else {
        showMessage("error", result.message || "❌️ Profile update failed.");
      }
    } catch (error) {
      console.error("❌️ Error updating profile:", error);
      showMessage("error", "❌️ An error occurred while updating profile.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      {/* Floating Message Alert */}
      {message.text && (
        <div
          className={`alert alert-${
            message.type === "success" ? "success" : "danger"
          } position-fixed top-0 end-0 m-3 shadow-lg d-flex align-items-center fade show`}
          style={{
            zIndex: 1050,
            minWidth: "320px",
            maxWidth: "380px",
            fontWeight: "bold",
            padding: "15px 20px",
            borderRadius: "15px",
            display: message.text ? "flex" : "none",
            backdropFilter: "blur(10px)",
            backgroundColor:
              message.type === "success"
                ? "rgba(40, 167, 69, 0.9)"
                : "rgba(220, 53, 69, 0.9)",
            color: "white",
            boxShadow:
              message.type === "success"
                ? "0px 4px 15px rgba(40, 167, 69, 0.6)"
                : "0px 4px 15px rgba(220, 53, 69, 0.6)",
            transition: "transform 0.5s ease-out",
            transform: message.text ? "translateY(0)" : "translateY(-100%)",
          }}
          role="alert"
        >
          <i
            className={`bi ${
              message.type === "success"
                ? "bi-check-circle-fill text-light"
                : "bi-exclamation-triangle-fill text-light"
            } me-3 fs-4`}
          ></i>
          <span>{message.text}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <h1 className="mb-4">Update Profile</h1>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-success mt-3" onClick={handleUpdateProfile}>
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
