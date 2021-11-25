import React, { useRef } from "react";
import { useState } from "react";
import classes from "./Form.module.css";
import axios from 'axios';

const Form = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ConfirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);


  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = ConfirmPasswordRef.current.value;

     
    axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1BTMA7z79Hl-kprnDA2dYOj0ZeIHyiEs",{
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword : enteredConfirmPassword,
      returnSecureToken: true,
    }).then((res) => {
      console.log(res)
      console.log(res.data.idToken)
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD1BTMA7z79Hl-kprnDA2dYOj0ZeIHyiEs',{
        enteredEmail,
        requestType: "VERIFY_EMAIL",
        idToken: res.data.idToken
      }).then(data => {
        console.log(data);
        alert(prompt(''))
      })
     
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
