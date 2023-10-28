import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email });
      window.alert("Reset Email Sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="body">
        <div className="div">
          <h1 className="forgot">Forgot Password</h1>
          <div className="div1">
            <div className="c1">Enter you Registered Email</div>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                className="c2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="c2 submit">
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
