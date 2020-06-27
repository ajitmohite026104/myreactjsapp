import axios from "axios";
import { Server } from "../config";

export default class CourseService {
  getCourseById = (id) => {
    return axios.get(`${Server.BASE_API_URL}/course/${id}`).then((res) => {
      return res.data.data;
    });
  };

  getAllCourses = () => {
    return axios.get(`${Server.BASE_API_URL}/courses`).then((res) => {
      return res.data.data;
    });
  };

  addNewCourse(course) {
    return axios
      .post(`${Server.BASE_API_URL}/course`, course)
      .then((res) => {
        if (res.data.success === true) {
          let videoFile = new FormData();
          videoFile.append("filename", res.data.id);
          videoFile.append("file", course.file);

          return this.uploadVideo(videoFile);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }

  uploadVideo(formData) {
    return axios
      .post(`${Server.BASE_URL}/upload`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log("Response: ", res);
        if (res.statusText === "OK") {
          return res.data.filename;
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }

  deleteCourse(courseId) {
    return axios
      .delete(`${Server.BASE_API_URL}/course/${courseId}`)
      .then((res) => {
        if (res.data.success === true) {
          return res.data.data;
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}
