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

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const LoginComponent = lazy(() => import("./components/loginComponent"));
// const GithubUsers = lazy(() => import("./components/GithubUsers"));
const BrowseCourses = lazy(() => import("./components/BrowseCourses"));
//const History = lazy(() => import("./components/History"));
const Profile = lazy(() => import("./components/Profile"));
const Video = lazy(() => import("./components/Video"));
const LoginCallback = lazy(() => import("./components/LoginCallback"));
const VideoDashboard = lazy(() => import("./components/VideoDashboard"));

const userData = {
  Name: "",
  Email: "",
  Image: "",
  IsLoggedIn: false,
};
const reducer = (state = userData, action) => state;
const store = createStore(reducer);

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    if (sessionStorage.getItem("auth_cookie")) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className="main">
        <Provider store={store}>
          <Router {...{ isLoggedIn }}>
            <NavigationBar></NavigationBar>

            <Container
              className="container-wrap"
              fluid="md"
              style={{ backgroundColor: "azure" }}
            >
              <Row>
                <Col>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/about" component={About} />
                      <Route path="/login" component={LoginComponent} />
                      <Route path="/oauth_callback" component={LoginCallback} />
                      {/* <Route path="/githubusers" component={GithubUsers} /> */}
                      <Route path="/profile" component={requireAuth(Profile)} />
                      <Route path="/browse" component={BrowseCourses} />
                      {/* <Route path="/history" component={requireAuth(History)} /> */}
                      <Route path="/video/:id" component={requireAuth(Video)} />
                      <Route path="/course/create" component={VideoDashboard} />
                      {!this.state.isLoggedIn && <Redirect push to="/login" />}
                    </Switch>
                  </Suspense>
                </Col>
              </Row>

              <Row />
            </Container>
            <Footer />
            {/* <div className="container-fluid">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/githubusers" component={GithubUsers} />
                <Route path="/profile" component={Profile} />
                <Route path="/browse" component={BrowseCourses} />
                <Route path="/history" component={History} />
              </Switch>
            </Suspense>
          </div> */}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
