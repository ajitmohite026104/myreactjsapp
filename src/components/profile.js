import React from "react";
import AppUtils from "../utilities/AppUtils";

class Profile extends React.Component {
  state = {
    userName: "Something went wrong!",
    profilePicture:
      "https://wholesaleduniya.com/wholeadmin/files/DesignImages/22115/63327_1.jpg",
    email: "",
    isAdmin: false,
  };

  async componentDidMount() {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));

    if (userData) {
      let picExists = await AppUtils.checkImageExists(userData.imageUrl);
      let picUrl = picExists ? userData.imageUrl : this.state.profilePicture;
      this.setState({
        userName: userData.name,
        profilePicture: picUrl,
        email: userData.email,
        isAdmin: userData.isAdmin,
      });
    }
  }

  render() {
    return (
      <div className="">
        <h1>&nbsp;</h1>
        <div className="row">
          <div className="col-2">
            <img
              src={this.state.profilePicture}
              alt="profile"
              height="150"
              width="150"
            />
          </div>
          <div className="">
            <h1>
              <b>{this.state.email}</b>
            </h1>
            <h4>Name - {this.state.userName}</h4>
            <h4>Role - {this.state.isAdmin ? "Admin" : "General User"}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
