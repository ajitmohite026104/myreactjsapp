import React from 'react';
import ListComponent from './ListComponent';

const courses = [{
    courseLogo: 'https://www.python.org/static/img/python-logo.png',
    courseId: 'CR101',
    courseName: 'Python',
    courseDescription: `Python is a programming language that lets you work quickly
    and integrate systems more effectively.`
},
{
    courseLogo: 'https://vuejs.org/images/logo.png',
    courseId: 'CR102',
    courseName: 'VueJS',
    courseDescription: `Vue (pronounced /vjuː/, like view) is a progressive framework for building 
    user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be 
    incrementally adoptable.`
},
{
    courseLogo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    courseId: 'CR103',
    courseName: 'ReactJS',
    courseDescription: `React is a JavaScript library for building user interfaces. 
    It is maintained by Facebook and a community of individual developers and companies. 
    React can be used as a base in the development of single-page or mobile applications.`
},
{
    courseLogo: 'https://angular.io/assets/images/logos/angular/shield-large.svg',
    courseId: 'CR104',
    courseName: 'Angular',
    courseDescription: `Angular is a TypeScript-based open-source web application framework 
    led by the Angular Team at Google and by a community of individuals and corporations. 
    Angular is a complete rewrite from the same team that built AngularJS.`
}];

const courseList = courses.map((course) =>
    <tr key={course.courseId}>
        <td>{course.courseId}</td>
        <td><img src={course.courseLogo} alt='logo' height={100} width={200} /> <span style={{textAlign:"center"}}>{course.courseName}</span> </td>
        <td>{course.courseDescription}</td>
    </tr>
    );
const tableHeader =(
    <tr>
      <th>Course ID</th>
      <th>Course Title</th>
      <th>Description</th>
    </tr>
);

class BrowseCourses extends React.Component{
    render(){
        return(
           <div>
               <h2>Available Courses</h2>
               <ListComponent listItems={courseList} header={tableHeader}></ListComponent>
           </div>     
        );
    };
};

export default BrowseCourses;