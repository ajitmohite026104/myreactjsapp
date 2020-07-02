// import React from 'react';
// import ListComponent from './ListComponent';

// const viewedCourses = [{
//     courseId: 'C201',
//     courseTitle: 'React: Getting Started',
//     type: 'Course',
//     viewTime: '2h 13m',
//     duration: '4h 2m',
//     completionPercentage: '55%',
//     lastViewed: 'May 04, 2020'
// },
// {
//     courseId: 'C202',
//     courseTitle: 'React: The Big Picture',
//     type: 'Course',
//     viewTime: '1h 11m',
//     duration: '1h 11m',
//     completionPercentage: '100%',
//     lastViewed: 'Apr 23, 2020'
// }];

// const viewedCourseList = viewedCourses.map((course) =>
//     <tr key={course.courseId}>
//         <td>{course.courseTitle}</td>
//         <td>{course.type}</td>
//         <td>{course.viewTime}</td>
//         <td>{course.duration}</td>
//         <td>{course.completionPercentage}</td>
//         <td>{course.lastViewed}</td>
//     </tr>
//     );

//     const tableHeader =(
//         <tr>
//           <th>TITLE</th>
//           <th>TYPE</th>
//           <th>VIEW TIME</th>
//           <th>DURATION</th>
//           <th>COMPLETION PERCENTAGE</th>
//           <th>LAST VIEWED</th>
//         </tr>);

// class History extends React.Component{
//     render(){
//         return(
//             <div>
//                 <h2>History</h2>
//                 <ListComponent listItems={viewedCourseList} header={tableHeader}></ListComponent>
//             </div>
//         );
//     };
// };

// export default History;