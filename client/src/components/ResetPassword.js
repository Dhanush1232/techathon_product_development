import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const token = window.location.pathname.split("/").pop();
      try {
        const response = await axios.post(`/api/reset-password/${token}`, {
          password,
        });
        window.alert("Password Changed Successfully");
        Navigate("../login");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("password didnot matched");
    }
  };

  return (
    <>
      <div className="body">
        <div className="div">
          <h1 className="head">Reset Password</h1>
          <div className="div1">
            <form onSubmit={handlePasswordReset}>
              <div className="c1">New Password</div>
              <input
                type="password"
                className="c2"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="c1">Confirm New Password</div>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="c2 submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
