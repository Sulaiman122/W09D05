import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getPosts = async () => {
    try {
      await axios
        .get(`${BASE_URL}/post/${params.id}`, { withCredentials: true })
        .then((result) => {
          setData(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.get(`${BASE_URL}/user_available`, {
        withCredentials: true,
      });
      if (user.data) {
        const resp = await axios.post(
          `${BASE_URL}/comment/${params.id}`,
          {
            comment: e.target.comment.value,
            username: user.data.user._id,
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
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);
  return (
    <div>
      <div className="home">
        <div className="blog">
          <h1>{data[0]?.desc}</h1>
          <img
            src={data[0]?.img}
            alt="suppose to be picture here"
            width="400"
            height="400"
          />
          <h1>{data[0]?.desc}</h1>
        </div>

        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>New Comment</h3>
            <button type="submit">Submit</button>
          </div>
          <div className="commentTail">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
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
          {commments.length &&
            commments.map((comment, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className="realcommentRow">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{comment.username}</h3>
                      <p>{comment.comment}</p>
                      <p className="dateP">
                        {comment.createdAt.slice(0, 10)}{" "}
                        {comment.createdAt.slice(11, 16)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
};

export default Post;
