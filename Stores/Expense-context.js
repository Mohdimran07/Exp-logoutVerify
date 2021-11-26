import React, { useState } from "react";

const ExpenseContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const ExpenseContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedin = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
