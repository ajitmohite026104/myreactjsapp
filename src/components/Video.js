import React from "react";
import VideoPlayer from "react-video-js-player";
import CourseService from "../services/courseService";
import AppUtils from "../utilities/AppUtils";
import { Server } from "../config";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
        src: "",
        poster:
          "https://martechseries.com/wp-content/uploads/2015/09/Persistent-Systems-and-ValidSoft-Deliver-New-Secure-Digital-Voice-Authentication-Capabilities-for-Banking-and-Credit-Unions.jpg",
      },
    };
  }

  async componentDidMount() {
    let { params } = this.props.match;
    let serviceObj = new CourseService();
    let videoDetails = await serviceObj.getCourseById(params.id);

    if (videoDetails) {
      let posterExists = videoDetails.thumbnail
        ? await AppUtils.checkImageExists(videoDetails.thumbnail)
        : false;
      let posterURL = posterExists ? videoDetails.thumbnail : this.state.poster;
      this.setState({
        video: {
          src: `${Server.BASE_URL}/${videoDetails.videosrc}`,
          poster: posterURL,
        },
      });
    }
  }

  render() {
    let player = <div>Loading...</div>;
    if (this.state.video.src) {
      player = (
        <VideoPlayer
          controls={true}
          src={this.state.video.src}
          poster={this.state.video.poster}
          width="720"
          height="420"
          autoplay={false}
        />
      );
    }
    return (
      <>
        {/* <ReactPlayer
          controls
          width="720"
          height="650px"
          url="http://localhost:3100/CR101.mp4"
        /> */}
        {player}
      </>
    );
  }
}

export default Video;
