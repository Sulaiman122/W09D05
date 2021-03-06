import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import axios from "axios";
import Nav from './Nav'

const BASE_URL = process.env.REACT_APP_BASE_URL;



const Home = () => {
  const navigate = useNavigate();

  const responseGoogle=async(response)=>{
    console.log(response.profileObj);
    const result = await axios.post(`${BASE_URL}/google_login`, {
      email: response.profileObj.email,
      password: "4336498641-nqe16c7o3tit8osa5aj8mfl21rulj74r",
      username: response.profileObj.name
    }, {withCredentials: true});
    console.log(result.data);
    navigate('/posts')
  }

  return (
    <div>
    <Nav />
    <div className="home">
      <div className="homeContainer">
        <h1>Welcome to FlawBerry</h1>
        <div className="btns">
          <button>
            <Link className="s" style={{ textDecoration: "none" }} to="login">
              Login
            </Link>
          </button>
          <button>
            <Link className="s" style={{ textDecoration: "none" }} to="signUp">
              Sign up
            </Link>
          </button>
          <GoogleLogin
            clientId="834336498641-nqe16c7o3tit8osa5aj8mfl21rulj74r.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /><br/>
                    <button style={{width:'100%'}}>
            <Link style={{ textDecoration: "none", color:'black'}} to="posts">
              Check Posts
            </Link>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
