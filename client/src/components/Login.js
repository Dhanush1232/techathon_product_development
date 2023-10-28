import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      window.alert("login successfully");
      navigate("/");
    }
  };

  return (
    <>
      <div className="body">
        <div className="div">
          <h1 className="head">LogIn</h1>
          <div className="div1">
            <form method="POST">
              <div className="c1">Email</div>
              <input
                type="text"
                name="email"
                className="c2"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
              />

              <div className="c1">Password</div>
              <input
                type="password"
                name="Password"
                className="c2"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
              />

              <div className="c3">
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </div>

              <div className="c3">
                <NavLink to="/">Already have an account? Register</NavLink>
              </div>

              <input
                type="submit"
                name="signin"
                value="Log In"
                className="c2 submit"
                onClick={loginUser}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
