import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const token = SignIn.token;
  const [error, seterror] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    try {
      axios
        .get(`${BASE_URL}/posts`, { withCredentials: true })
        .then((result) => {
          if (result.data.error) {
            seterror(true);
          } else {
            console.log(result.data);
            setPosts(result.data);
          }
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
      const result = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);


  const [addError, setAddError] = useState('')
  const newPost = async(e) => {
    try {
      e.preventDefault();
      const user =await axios.get(`${BASE_URL}/user_available`, { withCredentials: true })
      if(user.data){
        const result =await axios.post(`${BASE_URL}/post`,{
          desc: e.target.desc.value,
          img: e.target.img.value,
          title: e.target.title.value,
          user: user.data.user._id
        }, { withCredentials: true });
        console.log(result.data);
        if(result.data.error){
          setAddError(result.data.error)
        }else{
          e.target.desc.value = "";
          e.target.img.value = "";
          e.target.title.value = "";
          getPosts();
        }
      }else{
        console.log('log in man');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [add, setAdd] = useState(false);
  return (
    <div className="home">
      <div className="blog">
        <h1>Blogs</h1>

        {!error && add ? (
          <form onSubmit={newPost} className="new">
            <p>New post:</p>
            <div>
              <p>Title: </p>
              <input type="text" name="title" />
            </div>
            <div>
              <p>Description: </p>
              <textarea name="desc" cols="30" rows="10"></textarea>
            </div>
            <div>
              <p>Img: </p>
              <input type="text" name="img" />
            </div>
            {addError}
            <div>
              <button type="submit">Add</button>
              <button onClick={() => setAdd(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setAdd(true)}>Add Post</button>
        )}

        {error ? (
          <p style={{ marginTop: "50px" }}>Kindly login first to see posts</p>
        ) : null}
        <div className="posts">
          {posts?.map((item) => {
            return (
              <div key={item._id} className="post" onClick={()=>navigate(`/post/${item._id}`)}>
                <img
                  src="https://images.pexels.com/photos/64699/pexels-photo-64699.jpeg"
                  wdith="100"
                  height="100"
                  alt=""
                />
                <h2 style={{ display: "inline" }}>{item.desc}</h2>
                <p>created at {item.createdAt.slice(0, 10)}</p>
                {/* <button onClick={() => del(item._id)}>x</button> */}
                <br />
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
          {console.log(error)}
          {!error ? <button onClick={logout}>Logout</button> : null}
        </div>
      </div>
    </div>
  );
};

export default Posts;
