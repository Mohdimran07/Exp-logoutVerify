import React, { useRef } from "react";
import { useState } from "react";
import classes from "./Form.module.css";

const Form = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ConfirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1BTMA7z79Hl-kprnDA2dYOj0ZeIHyiEs",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword : enteredConfirmPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if(res.ok){
        console.log('user sucessfully signed-Up')
      } else {
        return res.json().then(data => {
          console.log(data);
        })
      }
    })
      
  

  };
  return (
    <section className={classes.contain}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            placeholder="email"
          />
        </div>
        <br></br>
        <div className={classes.control}>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            placeholder="password"
          />
        </div>
        <br></br>
        <div className={classes.control}>
          <input
            type="password"
            id="confirm-password"
            required
            ref={ConfirmPasswordRef}
            placeholder="confirm password"
          />
        </div>

        <div className={classes.toggle}>
          {<button>{isLogin ? "Login" : "Create Account"}</button>}
          <button
            type="button"
            className={classes.actions}
            onClick={switchModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
