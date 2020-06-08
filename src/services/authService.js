import React from "react";
import { withRouter } from "react-router";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: sessionStorage.getItem("auth_cookie"),
      };
    }

    componentDidMount() {
      this.checkAuth();
    }

    checkAuth() {
      const location = this.props.location;
      const redirect = location.pathname + location.search;
      if (!sessionStorage.getItem("auth_cookie")) {
        this.props.history.push(`/login?returnUrl=${redirect}`);
        sessionStorage.setItem("returnUrl", redirect);
      }
    }

    render() {
      return sessionStorage.getItem("auth_cookie") ? (
        <Component {...this.props} />
      ) : null;
    }
  }
  return withRouter(AuthenticatedComponent);
}
