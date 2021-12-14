import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";

const Post = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [User, setUser] = useState("");
  const [likes, setlikes] = useState(0);
  const [currentUserLiked, setcurrentUserLiked] = useState(false);

  const getPosts = async () => {
    try {
      await axios
        .get(`${BASE_URL}/post/${params.id}`, { withCredentials: true })
        .then((result) => {
          console.log(result.data);
          setlikes(result.data[0].like.length);
          setData(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      if (User) {
        const resp = await axios.post(
          `${BASE_URL}/comment/${params.id}`,
          {
            comment: e.target.comment.value,
            username: User,
          },
          {
            withCredentials: true,
          }
        );
        getComments();
      }
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value = "";
  };

  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);

  const getComments = async () => {
    try {
      const resp = await axios.post(
        `${BASE_URL}/comments`,
        {
          postID: params.id,
        },
        { withCredentials: true }
      );
      console.log(resp.data);
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const DeleteComment = async (id) => {
    try {
      const resp = await axios.delete(`${BASE_URL}/comment/${id}`, {
        withCredentials: true,
      });
      console.log(resp.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateComment = async (id) => {
    try {
      const new_comment = prompt("Edit comment to:");
      const resp = await axios.put(
        `${BASE_URL}/comment/${id}`,
        {
          comment: new_comment,
        },
        {
          withCredentials: true,
        }
      );
      console.log(resp.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/likePost/${params.id}`, {
        withCredentials: true,
      });
      console.log(resp.data.result);
      if(resp.data.result=='removeLike'){
          setcurrentUserLiked(false)
      }else if(resp.data.result=='newLike'){
        setcurrentUserLiked(true)
      }
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    const user = await axios.get(`${BASE_URL}/user_available`, {
      withCredentials: true,
    });
    setUser(user.data.user._id);
    getPosts();
    getComments();
    data[0]?.like.map((like) => {
      if (like.user == User) {
        setcurrentUserLiked(true);
      }
    });
  }, []);

  return (
    <div>
      <Nav />
      <div className="home">
        <div className="blog">
          <h1>{data[0]?.title}</h1>
          <img
            src={data[0]?.img}
            alt="suppose to be picture here"
            width="400"
            height="400"
          />
          <p>{data[0]?.desc}</p>
          <h4>
            Like:
            {currentUserLiked ? (
              <span id="heart" onClick={likePost}>
                🤍
              </span>
            ) : (
              <span onClick={likePost}>🤍</span>
            )}
            | {likes}
          </h4>
        </div>

        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>New Comment</h3>
            <button type="submit">Submit</button>
          </div>
          <div className="commentTail">
            <img
              src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg"
              alt=""
            />
            <textarea
              name="comment"
              placeholder="Your message"
              required
              cols="55"
              rows="8"
            ></textarea>
          </div>
          <div className="numComment">
            <h3>{noComment} Comments</h3>
          </div>
          {commments
            ?.map((comment, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className="realcommentRow">
                    <img
                      src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{comment.user.username}</h3>
                      <p>{comment.comment}</p>
                      <p className="dateP">
                        {comment.createdAt.slice(0, 10)}
                        {comment.createdAt.slice(11, 16)}
                      </p>
                    </div>
                    {console.log(comment)}
                    {comment.user._id == User ? (
                      <p
                        className="del"
                        onClick={() => DeleteComment(comment._id)}
                      >
                        ❌
                      </p>
                    ) : (
                      <></>
                    )}
                    {comment.user._id == User ? (
                      <p
                        className="del"
                        onClick={() => UpdateComment(comment._id)}
                      >
                        🖊️
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
            .reverse()}
        </form>
      </div>
    </div>
  );
};

export default Post;
