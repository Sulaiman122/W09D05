import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login'

const responseGoogle=(response)=>{
  console.log(response);
  console.log(response.profileObj);
}

const Home = () => {

  
  return (
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
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
