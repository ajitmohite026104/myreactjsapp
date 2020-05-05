//Github Usernames : gaearon, sophiebits, sebmarkbage, bvaughn

import React, { Suspense, lazy } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const LoginComponent = lazy(() => import('./components/loginComponent'));
const GithubUsers = lazy(() => import('./components/GithubUsers'));
const BrowseCourses = lazy(() => import('./components/BrowseCourses'));
const History = lazy(() => import('./components/History'));
const Profile = lazy(() => import('./components/profile'));


class App extends React.Component {
  state = {
    isLoggedIn: true,
  }

  render() {
    return (
      <div>
        <Router>
          <NavigationBar isLoggedIn={this.state.isLoggedIn}></NavigationBar>
          <Container fluid="md" style={{backgroundColor:'azure'}}>
            <Row>
              <Col>
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
              </Col>
            </Row>
            <Row></Row>
          </Container>
          <div className="fixed-bottom">
            Footer content
          </div>
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
      </div>
    );
  }
}

export default App;