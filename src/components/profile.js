import React from 'react';
//import ProfilePicture from '../../public/images/profile.png';

class Profile extends React.Component{

    state = {
        userName: 'Ajit Mohite',
        profilePicture: '../../public/images/profile.png',
    };

    render(){
        return(
            <div>
                <img src={this.state.profilePicture} alt="profile" height="100" width="100" />
                <h2>{this.state.userName}</h2>
            </div>
        );
    };
};

export default Profile;