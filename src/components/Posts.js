import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Posts = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState("");
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
    } catch (error) {
      console.log(error);
    }
  };

  const DeletePost = (id) => {
    try {
      axios
        .delete(`${BASE_URL}/post/${id}`, { withCredentials: true })
        .then(() => {
          getPosts();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const user = await axios.get(`${BASE_URL}/user_available`, {
      withCredentials: true,
    });
    setUser(user.data.user._id);
    getPosts();
  }, []);

  const [addError, setAddError] = useState("");
  const newPost = async (e) => {
    try {
      e.preventDefault();
      if (User) {
        const result = await axios.post(
          `${BASE_URL}/post`,
          {
            desc: e.target.desc.value,
            img: e.target.img.value,
            title: e.target.title.value,
            user: User,
          },
          { withCredentials: true }
        );
        console.log(result.data);
        if (result.data.error) {
          setAddError(result.data.error);
        } else {
          e.target.desc.value = "";
          e.target.img.value = "";
          e.target.title.value = "";
          getPosts();
        }
      } else {
        console.log("log in man");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [add, setAdd] = useState(false);
  return (
    <div>
      <Nav />
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
            {posts
              ?.map((item) => {
                return (
                  <div key={item._id} className="post">
                    <div onClick={() => navigate(`/post/${item._id}`)} className="pointor">
                      <img
                        src={item.img}
                        wdith="150"
                        height="150"
                        alt=""
                      />
                      <h2 style={{ display: "inline" }}>{item.title}</h2>
                    </div>
                    <div className="flex">
                      <p>created at {item.createdAt.slice(0, 10)}</p>
                      {item.user?._id == User ? (
                        <p className="del" onClick={() => DeletePost(item._id)}>
                          ❌
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <br />
                  </div>
                );
              })
              .reverse()}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
