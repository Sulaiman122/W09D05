import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const token = SignIn.token;
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    try {
      axios
        .get(`${BASE_URL}/posts`, { withCredentials: true })
        .then((result) => {
          console.log(result.data);
          setPosts(result.data);
        });

      //   if(result.data.error){
      //       navigate("/error")
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/logout`);
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      <div className="blog">
        <h1>Blogs</h1>
        {/* <form onSubmit={newTodo} className="new">
        <p>New todo:</p>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form> */}
        <div className="posts">
          {posts.length &&
            posts.map((item) => {
              return (
                <div key={item._id} className="post">
                  <img src="https://images.pexels.com/photos/64699/pexels-photo-64699.jpeg" wdith="100" height='100' alt="" />
                  <h2 style={{ display: "inline" }}>{item.desc}</h2>
                  {/* <button onClick={() => del(item._id)}>x</button> */}
                  <br />
                </div>
              );
            })}
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Posts;
