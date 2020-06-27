import React from "react";
import ListComponent from "./ListComponent";
import AppUtils from "../utilities/AppUtils";
import CourseService from "../services/courseService";

// const courses = [
//   {
//     courseLogo: "https://www.python.org/static/img/python-logo.png",
//     courseId: "CR101",
//     courseName: "Python",
//     courseDescription: `Python is a programming language that lets you work quickly
//     and integrate systems more effectively.`,
//   },
//   {
//     courseLogo: "https://vuejs.org/images/logo.png",
//     courseId: "CR102",
//     courseName: "VueJS",
//     courseDescription: `Vue (pronounced /vjuː/, like view) is a progressive framework for building
//     user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be
//     incrementally adoptable.`,
//   },
//   {
//     courseLogo:
//       "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
//     courseId: "CR103",
//     courseName: "ReactJS",
//     courseDescription: `React is a JavaScript library for building user interfaces.
//     It is maintained by Facebook and a community of individual developers and companies.
//     React can be used as a base in the development of single-page or mobile applications.`,
//   },
//   {
//     courseLogo:
//       "https://angular.io/assets/images/logos/angular/shield-large.svg",
//     courseId: "CR104",
//     courseName: "Angular",
//     courseDescription: `Angular is a TypeScript-based open-source web application framework
//     led by the Angular Team at Google and by a community of individuals and corporations.
//     Angular is a complete rewrite from the same team that built AngularJS.`,
//   },
// ];

// const tableHeader = (
//   <tr>
//     <th>Course ID</th>
//     <th>Course Title</th>
//     <th>Description</th>
//   </tr>
// );

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isAdmin: false,
    };
    this.navigateToCourse = this.navigateToCourse.bind(this);
    this.getCourseThumbnail = this.getCourseThumbnail.bind(this);
  }

  async componentDidMount() {
    let userData = JSON.parse(sessionStorage.getItem("user_info"));
    let serviceObj = new CourseService();
    let courseList = await serviceObj.getAllCourses();
    if (courseList && courseList.length > 0) {
      this.setState({
        courses: courseList,
        isAdmin: userData ? userData.isAdmin : false,
      });
    }
  }

  navigateToCourse(courseId) {
    this.props.history.push("/video/" + courseId);
  }

  getCourses(courses) {
    let { search } = this.props.location;
    const result = AppUtils.getQueryParamValue("filterBy", search);
    if (result && result !== "") {
      return courses.filter(
        (c) =>
          c.title.toLowerCase().includes(result.toLowerCase()) ||
          c.description.toLowerCase().includes(result.toLowerCase())
      );
    }
    return courses;
  }

  async removeCourse(course) {
    // let result = confirm(
    //   `Are you sure you want to delete course - ${course.title} ?`
    // );
    let serviceObj = new CourseService();
    const result = await serviceObj.deleteCourse(course._id);
    if (result) {
      let courseList = this.state.courses.filter((c) => c._id !== result._id);
      this.setState({
        courses: courseList,
      });
    }
  }

  getCourseThumbnail(imgURL) {
    return imgURL && imgURL !== ""
      ? imgURL
      : "https://martechseries.com/wp-content/uploads/2015/09/Persistent-Systems-and-ValidSoft-Deliver-New-Secure-Digital-Voice-Authentication-Capabilities-for-Banking-and-Credit-Unions.jpg";
    // if (imgURL && imgURL !== "") {
    //   await AppUtils.checkImageExists(imgURL).then((res) => {
    //     if (res) return imgURL;
    //     return "https://martechseries.com/wp-content/uploads/2015/09/Persistent-Systems-and-ValidSoft-Deliver-New-Secure-Digital-Voice-Authentication-Capabilities-for-Banking-and-Credit-Unions.jpg";
    //   });
    // }
    // return "https://martechseries.com/wp-content/uploads/2015/09/Persistent-Systems-and-ValidSoft-Deliver-New-Secure-Digital-Voice-Authentication-Capabilities-for-Banking-and-Credit-Unions.jpg";
  }

  render() {
    // const courseList = this.getCourses().map((course) => (
    //   <tr
    //     key={course.courseId}
    //     onClick={() => this.navigateToCourse(course.courseId)}
    //     className="courseLink"
    //   >
    //     <td>{course.courseId}</td>
    //     <td>
    //       <img src={course.courseLogo} alt="logo" height={100} width={200} />{" "}
    //       <span style={{ textAlign: "center" }}>{course.courseName}</span>{" "}
    //     </td>
    //     <td>{course.courseDescription}</td>
    //     <td></td>
    //   </tr>
    // ));
    const cardList = this.getCourses(this.state.courses).map((course) => {
      return (
        <div className="col-md-4" key={course._id}>
          <div className="card course-card" height="75">
            <img
              src={this.getCourseThumbnail(course.thumbnail)}
              className="card-img-top"
              height="200"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">
                {AppUtils.getShortText(course.description)}
              </p>
              <button
                onClick={() => this.navigateToCourse(course._id)}
                className="btn btn-outline-success"
              >
                Visit Course
              </button>
              &nbsp;
              {this.state.isAdmin && (
                <button
                  onClick={() => this.removeCourse(course)}
                  className="btn btn-outline-danger"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h2>Available Courses</h2>
        <ListComponent cardList={cardList}></ListComponent>
      </div>
    );
  }
}

export default BrowseCourses;
