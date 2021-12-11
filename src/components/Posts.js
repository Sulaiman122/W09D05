import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const token = SignIn.token;

  const getPosts =  () => {
        try {
          axios.post(`${BASE_URL}/posts`).then((result)=>{
              console.log(result.data);
          });
        //   if(result.data.error){
        //       navigate("/error")
        //   }
        } catch (error) {
          console.log(error);
        }
  };

  const logout = async() => {
    try {
      const result = await axios.get(`${BASE_URL}/logout`);
      console.log(result.data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="todo">
      <h1>Todos:</h1>
      {/* <form onSubmit={newTodo} className="new">
        <p>New todo:</p>
        <input type="text" name="todo" />
        <button type="submit">Add</button>
      </form> */}
      {/* {mytodo.length &&
        mytodo.map((item) => {
          return (
            <div key={item._id}>
              <h2 style={{ display: "inline" }}>{item.desc}</h2>
              <button onClick={() => del(item._id)}>x</button>
              <br />
            </div>
          );
        })} */}

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Posts;
