import React, { Component } from "react";

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    returnUrl: "",
    isLoggedIn: false,
    isAdmin: false,
    userDetails: {
      name: "",
      email: "",
      imageUrl: "",
      access_token: "",
    },
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export function withAppConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <AppConsumer>
        {(value) => <Component {...props} context={value} />}
      </AppConsumer>
    );
  };
}

export { AppProvider, AppConsumer, AppContext };
