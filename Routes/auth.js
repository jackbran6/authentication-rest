const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //Validate the data before you make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user is already in database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //New user created
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err.errmsg);
  }
});

//Login User
router.post("./login", async (req, res) => {
  //Validate the data before you make a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if user exists in the database
  const emailExists = await User.findOne({ email: req.body.email });
  if (!emailExists) return res.status(400).send("Email does not exist");
});

module.exports = router;
