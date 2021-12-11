import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const reset = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/forgot`, {
        email: e.target.email.value,
      });
      console.log(result.data);
      if (result.data.success) {
        setErr(result.data.success);
      }
      if (result.data.errors[0].msg) {
        setErr(result.data.errors[0].msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <div className="formm">
        <h1>Why did you forget :(</h1>

        <form onSubmit={reset}>
          <h3>Enter email to send you password reset link</h3>
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" />
          <button type="submit">Send</button>
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

export default ForgotPass;
