import React from "react";
import { connect } from "react-redux";

export class LoginCallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
    };
    this.timer = this.timer.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    let intervalId = setInterval(this.timer, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer() {
    this.setState({ count: this.state.count - 1 });
    if (this.state.count === 0) {
      this.redirect();
    }
  }

  redirect() {
    let returnUrl = sessionStorage.getItem("returnUrl");
    returnUrl = returnUrl ? returnUrl : "/";
    this.props.history.push(returnUrl);
  }

  render() {
    let authCookie = sessionStorage.getItem("auth_cookie");
    let userData = this.props.userData;

    return (
      <div className="container">
        <h1>Please wait. Redirecting in {this.state.count}s ...</h1>
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

function mapStateToProps(state) {
  return {
    userData: state,
  };
}

export default connect(mapStateToProps)(LoginCallback);
