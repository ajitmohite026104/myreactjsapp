//Github Usernames : gaearon, sophiebits, sebmarkbage, bvaughn

import React, { Suspense, lazy } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import requireAuth from "./services/authService";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { UserProvider } from "./userContext";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const LoginComponent = lazy(() => import("./components/LoginComponent"));
const BrowseCourses = lazy(() => import("./components/BrowseCourses"));
const Profile = lazy(() => import("./components/Profile"));
const Video = lazy(() => import("./components/Video"));
const LoginCallback = lazy(() => import("./components/LoginCallback"));
const CreateVideoForm = lazy(() => import("./components/CreateVideoForm"));
// const GithubUsers = lazy(() => import("./components/GithubUsers"));
// const History = lazy(() => import("./components/History"));

const userData = {
  Name: "",
  Email: "",
  Image: "",
  IsLoggedIn: false,
};
const reducer = (state = userData, action) => state;
const store = createStore(reducer);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isAdmin: false,
      setLogin: this.setLoginIn.bind(this),
    };
    this.setLoginIn = this.setLoginIn.bind(this);
  }

  componentDidMount() {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));
    this.setState({
      isLoggedIn: sessionStorage.getItem("auth_cookie") ? true : false,
      isAdmin: userData ? userData.isAdmin : false,
    });
  }

  setLoginIn(val) {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));
    this.setState({
      isLoggedIn: val,
      isAdmin: userData ? userData.isAdmin : false,
    });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div className="main">
        <UserProvider value={this.state}>
          <Provider store={store}>
            <Router {...{ isLoggedIn }}>
              <NavigationBar />

              <Container
                className="container-wrap"
                fluid="md"
                style={{ backgroundColor: "white" }}
              >
                <Row>
                  <Col>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/login" component={LoginComponent} />
                        <Route
                          path="/oauth_callback"
                          component={LoginCallback}
                        />
                        <Route
                          path="/profile"
                          component={requireAuth(Profile)}
                        />
                        <Route path="/browse" component={BrowseCourses} />
                        <Route
                          path="/video/:id"
                          component={requireAuth(Video)}
                        />
                        <Route
                          path="/course/create"
                          component={CreateVideoForm}
                        />
                        {/* <Route path="/githubusers" component={GithubUsers} /> */}
                        {/* <Route path="/history" component={requireAuth(History)} /> */}
                        {!this.state.isLoggedIn && (
                          <Redirect push to="/login" />
                        )}
                      </Switch>
                    </Suspense>
                  </Col>
                </Row>

                <Row />
              </Container>

              <Footer />
            </Router>
          </Provider>
        </UserProvider>
      </div>
    );
  }
}

export default App;
