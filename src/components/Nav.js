import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [userAvailable, setuserAvailable] = useState(false)

  useEffect(async() => {
    const user =await axios.get(`${BASE_URL}/user_available`, { withCredentials: true })
    console.log(user.data);
    if(user.data!='no user'){
        setuserAvailable(true)
    }
  }, [])



  const logout = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      setuserAvailable(false)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="nav">
      <button
        onClick={() => {
          navigate("/posts");
        }}
      >
        Posts
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      {userAvailable?<button onClick={logout}>Logout</button>:null}
    </div>
  );
};

export default Nav;
