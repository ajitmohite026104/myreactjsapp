import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { Google } from "../config";

class LoginComponent extends React.Component {
  state = {
    userName: "",
    password: "",
    returnUrl: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.userName);
    console.log(this.state.password);
    this.setState({ isLoggedIn: true });
    this.props.history.push("/");
  };

  handleGoogleLogin = (response) => {
    let res = response.profileObj;
    if (res) {
      this.props.userData.Name = res.name;
      this.props.userData.Email = res.email;
      this.props.userData.Image = res.imageUrl;
      this.props.userData.IsLoggedIn = true;
    }

    sessionStorage.setItem("auth_cookie", response.wc.id_token);
    sessionStorage.setItem("access_token", response.accessToken);
    sessionStorage.setItem("user_info", JSON.stringify(res));

    //window.location.reload();
    this.props.history.push("/oauth_callback");
  };

  render() {
    return (
      <Form
        style={{ paddingTop: 20 }}
        className="col-md-4 float-right"
        onSubmit={this.handleSubmit}
      >
        <InputGroup className="mb-3">
          <GoogleLogin
            style={{ marginBottom: 5 }}
            clientId={Google.CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={this.handleGoogleLogin}
            onFailure={this.handleGoogleLogin}
          ></GoogleLogin>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={this.state.userName}
            onChange={(event) =>
              this.setState({ userName: event.target.value })
            }
            required={true}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faKey} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
            type="password"
            value={this.state.password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
            required={true}
          />
        </InputGroup>
        <BootstrapButton type="submit">Log In</BootstrapButton>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state,
  };
}

export default connect(mapStateToProps)(LoginComponent);
