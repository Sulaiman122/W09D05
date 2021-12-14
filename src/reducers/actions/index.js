// define login action, when ever we call it, it will go to its reducer and perform its logic
export const logIn = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

// define LogOut action, when ever we call it, it will go to its reducer and perform its logic
export const LogOut = () => {
  return {
    type: "LOGOUT",
  };
};

// define TODO action, when ever we call it, it will go to its reducer and perform its logic
export const TODO = (data) => {
  return {
    type: "TODO",
    payload: data,
  };
};
