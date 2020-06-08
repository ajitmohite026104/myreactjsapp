import React from "react";
import VideoPlayer from "react-video-js-player";

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.player = {};
    let { params } = this.props.match;
    this.state = {
      video: {
        src: window.location.origin + "/Videos/" + params.id + ".mp4",
        poster: window.location.origin + "/Videos/" + params.id + ".png",
      },
    };
  }

  render() {
    return (
      <div>
        <VideoPlayer
          controls={true}
          src={this.state.video.src}
          poster={this.state.video.poster}
          width="720"
          height="420"
          autoplay={false}
        />
      </div>
    );
  }
}

export default Video;
