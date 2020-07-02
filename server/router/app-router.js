const express = require("express");

const UserCtrl = require("../controller/UserController");
const CourseCtrl = require("../controller/CourseController");

const router = express.Router();

router.post("/authenticate", UserCtrl.authenticateUser);
router.get("/user/:email", UserCtrl.getUserByEmail);
router.post("/user", UserCtrl.createUser);
router.put("/user/:id", UserCtrl.updateUser);

router.get("/courses", CourseCtrl.getCourseList);
router.get("/course/:id", CourseCtrl.getCourseById);
router.post("/course", CourseCtrl.addNewCourse);
router.put("/course/:id", CourseCtrl.updateCourse);
router.delete("/course/:id", CourseCtrl.deleteCourse);

module.exports = router;
