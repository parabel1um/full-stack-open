const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, password, name } = request.body;

  if (password === undefined || username === undefined) {
    return response
      .status(400)
      .json({ error: "password and username must be given" });
  } else if (password.length < 3 || username.length < 3) {
    return response.status(400).json({
      error: "password and username must be at least three characters long",
    });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      passwordHash,
      name,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users);
});

module.exports = usersRouter;
