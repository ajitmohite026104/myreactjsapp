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
        title: "",
        desc: "",
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
          title: videoDetails.title,
          desc: videoDetails.description,
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
          width="1020"
          height="420"
          autoplay={false}
        />
      );
    }
    return (
      <div className="course-desc">
        <div className="d-flex justify-content-left">
          <h2>{this.state.video.title}</h2>
        </div>
        {player}
        <p>{this.state.video.desc}</p>
      </div>
    );
  }
}

export default Video;
