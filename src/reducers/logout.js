const LogOut = (state = "", action) => {
  const { type } = action;

  switch (type) {
    case "LOGOUT":
      req.logout();
      return state;
    default:
      return state;
  }
};

export default LogOut;
