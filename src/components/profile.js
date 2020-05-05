import React from 'react';

class Profile extends React.Component{

    state = {
        userName: 'Ajit Mohite',
        profilePicture: 'https://scontent.fpnq7-1.fna.fbcdn.net/v/t1.0-1/p160x160/67233708_2246708418710107_1203464374803496960_n.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=myyGdXQkFLcAX-97yzE&_nc_ht=scontent.fpnq7-1.fna&_nc_tp=6&oh=e4f00f66b38d37b810255f5ad469e0c1&oe=5ED7D9CA',
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