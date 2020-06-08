import React from "react";

export class LoginCallback extends React.Component {
  redirect() {
    let returnUrl = sessionStorage.getItem("returnUrl");
    returnUrl = returnUrl ? returnUrl : "/";
    console.log("ReturnUrl: ", returnUrl);
    setTimeout(
      function () {
        this.props.history.push(returnUrl);
      }.bind(this),
      5000
    );
  }

  render() {
    let authCookie = sessionStorage.getItem("auth_cookie");
    let userData = JSON.parse(sessionStorage.getItem("userData"));

    // Code to save these values in firebase goes here

    this.redirect();

    return (
      <div>
        <h1>Redirecting back to home page...</h1>
        <h3>LoggedIn User Details: </h3>
        <br />
        <p>
          <b>Name: </b> {userData.Name}
        </p>
        <p>
          <b>Email: </b> {userData.Email}
        </p>
        <p>
          <b>Token: </b> {authCookie}
        </p>
      </div>
    );
  }
}

export default LoginCallback;
