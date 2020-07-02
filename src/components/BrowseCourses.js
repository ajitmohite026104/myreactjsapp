import React from "react";
import ListComponent from "./ListComponent";
import AppUtils from "../utilities/AppUtils";
import CourseService from "../services/courseService";
import {AppDefault} from "../config";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      isAdmin: false,
    };

    this.getCourseThumbnail = this.getCourseThumbnail.bind(this);
    this.confirmDeleteCourse = this.confirmDeleteCourse.bind(this);
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

  filterCourses(courses) {
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

  removeCourse(course) {
    let serviceObj = new CourseService();
    serviceObj
      .deleteCourse(course._id)
      .then((res) => {
        let courseList = this.state.courses.filter((c) => c._id !== res._id);
        this.setState({
          courses: courseList,
        });
      })
      .catch((err) => console.log(err));
  }

  confirmDeleteCourse(course) {
    confirmAlert({
      title: course.title,
      message: "Are you sure you want to delete this course ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.removeCourse(course);
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
      closeOnEscape: false,
      closeOnClickOutside: false,
    });
  }

  getCourseThumbnail(imgURL) {
    return imgURL && imgURL !== ""
      ? imgURL
      : AppDefault.imageURL;
  }

  render() {
    let filteredCourses = this.filterCourses(this.state.courses);
    let heading = "No Courses Available";
    if(filteredCourses && filteredCourses.length > 0) {
      heading = "Courses Available";
    }
    const cardList = filteredCourses.map((course) => {
      return (
        <div className="col-md-4" key={course._id}>
          <div className="card course-card" height="75">
            <img
              src={this.getCourseThumbnail(course.thumbnail)}
              className="card-img-top"
              height="200"
              alt="..."
            />
            <div className="card-body" height="75">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text" height="75">
                {AppUtils.getShortText(course.description)}
              </p>
              <div className="">
                <button
                    onClick={() => this.props.history.push("/video/" + course._id)}
                    className="btn btn-outline-secondary"
                    style={{margin: "0.3rem"}}
                  >
                    Visit Course
                  </button>
                  {this.state.isAdmin && (
                    <button
                      onClick={() => this.confirmDeleteCourse(course)}
                      className="btn btn-outline-danger"
                      style={{margin: "0.3rem"}}
                    >
                      Remove
                    </button>
                  )}
              </div>
            </div>            
          </div>
        </div>
      );
    });

    return (
      <div>
        <h2>{heading}</h2>
        <ListComponent cardList={cardList}></ListComponent>
      </div>
    );
  }
}

export default BrowseCourses;

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
