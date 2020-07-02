import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import BootstrapButton from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "react-google-login";
import { Google } from "../config";
import LoginService from "../services/loginService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserConsumer } from "../userContext";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleGoogleLoginFailure = this.handleAuthFailure.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const loginService = new LoginService();
    let { userName, password } = this.state;

    const result = await loginService.authenticateUser(userName, password);

    if (result && result.success === true) {
      // this.props.userData.Name = result.data.name;
      // this.props.userData.Email = result.data.email;
      // this.props.userData.Image = result.data.imageUrl;
      // this.props.userData.IsLoggedIn = true;
      sessionStorage.setItem("auth_cookie", result.data.token);
      sessionStorage.setItem("user_info", JSON.stringify(result.data));
      this.props.history.push("/oauth_callback");
    } else {
      this.handleAuthFailure(result);
    }
  }

  async handleGoogleLogin(response) {
    const loginService = new LoginService();
    let res = response.profileObj;

    if (res) {
      // this.props.userData.Name = res.name;
      // this.props.userData.Email = res.email;
      // this.props.userData.Image = res.imageUrl;
      // this.props.userData.IsLoggedIn = true;

      let dbResponse = await loginService.addUserLogin({
        name: res.name,
        email: res.email,
        imageUrl: res.imageUrl,
        isAdmin: false,
      });

      if (dbResponse) {
        sessionStorage.setItem("auth_cookie", response.wc.id_token);
        sessionStorage.setItem("access_token", response.accessToken);
        sessionStorage.setItem("user_info", JSON.stringify(res));

        //window.location.reload();
        this.props.history.push("/oauth_callback");
      }
    }
  }

  handleAuthFailure(err) {
    confirmAlert({
      title: "Authentication Failed",
      message: err && err.error ? err.error : "",
      buttons: [
        {
          label: "Ok",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  render() {
    return (
      <UserConsumer>
        {(value) => {
          return (
            <div className="d-flex justify-content-center">
              <div>
                <img
                  src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
                  alt=""
                  className="img-fluid identity"
                />
              </div>
              
              <Form
                style={{ paddingTop: 20 }}
                className="col-md-4"
                onSubmit={(e) => {
                  this.handleSubmit(e).then((res) => {
                    value.setLogin(true);
                  });
                }}
              >
                <InputGroup className="mb-3">
                  <GoogleLogin
                    clientId={Google.CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={(e) => {
                      this.handleGoogleLogin(e).then((res) => {
                        value.setLogin(true);
                      });
                    }}
                    onFailure={this.handleAuthFailure}
                  ></GoogleLogin>
                </InputGroup>
                <h6 className="d-flex justify-content-center">Or</h6>
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
                <BootstrapButton variant="secondary" type="submit">
                  Log In
                </BootstrapButton>
              </Form>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

export default LoginComponent;
