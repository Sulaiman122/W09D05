const initialState = {
  token: localStorage.getItem('token'),
  role: "user",
};
const SignIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { token, role } = payload;
      localStorage.setItem("token", token);
      return { token, role };

    default:
      return state;
  }
};





export default SignIn;
