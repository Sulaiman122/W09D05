import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const login = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/login`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      console.log(result);
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("role", result.data.result.role.role);
        if (result.data.result.role.role == "admin") {
          navigate("/");
        } else {
          navigate("/todo");
        }
      } else {
        setErr(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="formm">
        <h1>Login</h1>

        <form onSubmit={login}>
          <div className="group">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" />
            </div>
            <p>OR</p>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" />
            </div>
          </div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
        <p>{err}</p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Login;
