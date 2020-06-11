import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
  state = {
    userName: "Something went wrong!",
    profilePicture:
      "https://wholesaleduniya.com/wholeadmin/files/DesignImages/22115/63327_1.jpg",
    email: "",
  };

  componentDidMount() {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));
    console.log(userData);
    if (userData) {
      this.setState({
        userName: userData.name,
        profilePicture: userData.imageUrl,
        email: userData.email,
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <img
            src={this.state.profilePicture}
            alt="profile"
            height="100"
            width="100"
          />
        </div>
        <div>
          <h1>{this.state.userName}</h1>
          <h5>{this.state.email}</h5>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state,
  };
}

export default connect(mapStateToProps)(Profile);
