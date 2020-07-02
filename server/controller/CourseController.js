const Course = require("../models/course");
const { response } = require("express");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

getCourseList = async (req, res) => {
  await Course.find({}, (err, courses) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!courses.length) {
      return res.status(200).json({ success: false, error: `No course found` });
    }
    return res.status(200).json({ success: true, data: courses });
  }).catch((err) => console.log(err));
};

getCourseById = async (req, res) => {
  await Course.findOne({ _id: req.params.id }, (err, course) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        error: `Course with ${req.params.id} not found`,
      });
    }

    return res.status(200).json({ success: true, data: course });
  }).catch((err) => console.log(err));
};

addNewCourse = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide course details",
    });
  }

  const course = new Course(body);
  course.videosrc = `uploads/${course._id}.mp4`;

  if (!course) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid course information" });
  }

  course
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: course._id,
        message: "Course created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Course not created!",
      });
    });
};

updateCourse = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide information to update",
    });
  }

  Course.findOne({ _id: req.params.id }, (err, course) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Course not found!",
      });
    }

    course.title = body.title;
    course.description = body.description;
    course.videosrc = body.videosrc;
    course.thumnail = body.thumbnail;
    course
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: course._id,
          message: "Course updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Course not updated!",
        });
      });
  });
};

deleteCourse = async (req, res) => {
  await Course.findOneAndDelete({ _id: req.params.id }, async (err, course) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: `Course not found` });
    }

    await unlinkAsync("../server/uploads/" + req.params.id + ".mp4");

    return res.status(200).json({ success: true, data: course });
  }).catch((err) => console.log(err));
};

module.exports = {
  getCourseList,
  getCourseById,
  addNewCourse,
  updateCourse,
  deleteCourse,
};
