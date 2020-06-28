const User = require("../models/user");

authenticateUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: `User credentials invalid` });
    }
    if (user.password && user.password === password) {
      const tokenString = user.email + "$" + user.password;
      const buff = new Buffer.alloc(64, tokenString, "base64");
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        imageUrl: user.imageUrl ? user.imageUrl : "",
        token: buff.toString(),
      };
      return res.status(200).json({ success: true, data: data });
    }
    return res
      .status(200)
      .json({ success: false, error: `User credentials invalid` });
  }).catch((err) => console.log(err));
};

getUserByEmail = async (req, res) => {
  await User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl ? user.imageUrl : "",
    };

    return res.status(200).json({ success: true, data: data });
  }).catch((err) => console.log(err));
};

createUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide user details",
    });
  }

  let userAlreadyExists = await User.findOne(
    { email: body.email },
    (err, user) => {
      if (user) {
        return user;
      }
    }
  );

  if (userAlreadyExists) {
    return res.status(201).json({
      success: true,
      id: userAlreadyExists._id,
      message: "User already exists!",
    });
  }

  const user = new User(body);
  user.isAdmin = false;

  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid user details!" });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }

    user.name = body.name;
    user.email = body.email;
    user.isAdmin = body.isAdmin;
    user.imageUrl = body["imageUrl"];
    user.password = body["password"];

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

module.exports = {
  authenticateUser,
  getUserByEmail,
  createUser,
  updateUser,
  //deleteUser,
};
