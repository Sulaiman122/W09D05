const initialState = {
  post: [],
};

const Post = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "TODO":
      return payload;
    default:
      return state;
  }
};

export default Post;
