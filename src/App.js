//Github Usernames : gaearon, sophiebits, sebmarkbage, bvaughn

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import axios from 'axios';
//import LoginComponent from './components/loginComponent';
import NavigationBar from './components/NavigationBar';
import Profile from './components/profile';
//import ReactDOM from "react-dom";
// const testData = [
//   { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
//   { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
//   { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
// ];

const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const LoginComponent = lazy(() => import('./components/loginComponent'));
const GithubUsers = lazy(() => import('./components/GithubUsers'));



class App extends React.Component {
  state = {
    isLoggedIn: false
  }

  render() {
    return (
      <div>
        <Router>
          <NavigationBar isLoggedIn={this.state.isLoggedIn}></NavigationBar>
          <div className="container-fluid">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/githubusers" component={GithubUsers} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;