import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration is Successfull");
      console.log("Successfull Registration");
      navigate("../login");
    }
  };

  return (
    <>
      <div className="body">
        <div className="div">
          <h1 className="head">Register</h1>
          <div className="div1">
            <form method="POST">
              <div className="c1">Name</div>
              <input
                type="text"
                name="name"
                autoComplete="off"
                className="c2"
                value={user.name}
                onChange={handleInputs}
                placeholder="Your Name"
              />

              <div className="c1">Email</div>
              <input
                type="text"
                name="email"
                autoComplete="off"
                className="c2"
                value={user.email}
                onChange={handleInputs}
                placeholder="Your email"
              />

              <div className="c1">Password</div>
              <input
                type="password"
                name="password"
                autoComplete="off"
                className="c2"
                value={user.password}
                onChange={handleInputs}
                placeholder="Your Password"
              />

              <div className="c3">
                <NavLink to="/login">Don't have an account? Login</NavLink>
              </div>

              <input
                type="submit"
                name="signup"
                className="c2 submit"
                value="Register"
                onClick={PostData}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
