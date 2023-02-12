import mongoose from "mongoose";
const { model } = mongoose;
const User = model("Users");
import { hashSync, compareSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export async function index(req, res) {
  const users = await User.findById(req.userId);
  return res.json(users);
}

// create user
export async function create(req, res) {
  let usercheck = await User.findOne().where("email").equals(req.body.email);
  if (!usercheck) {
    userNew = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      email: req.body.email,
      role: 0,
    });
    User.create(userNew).then(() => {
      return res.json("Registred");
    });
  }
  return res.status(400).json({ error: "wrong username or password" });
}

// update user
export async function update(req, res) {
  let usercheck = await User.findOne().where("email").equals(req.body.email);
  if (usercheck) {
    userUpdate = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      email: req.body.email,
      role: 0,
    });
    User.update(userUpdate).then(() => {
      return res.json("Updated");
    });
  }
  return res.status(400).json({ error: "wrong username or password" });
}

// delete user
export async function remove(req, res) {
  let usercheck = await User.findOne().where("email").equals(req.body.email);
  if (usercheck) {
    User.delete(userDelete).then(() => {
      return res.json("Deleted");
    });
  }
  return res.status(400).json({ error: "wrong email" });
}

//login
export async function login(req, res) {
  let usercheck = await User.findOne()
    .where("username")
    .equals(req.body.username);
  const match = compareSync(req.body.password, usercheck.password);
  if (match == true) {
    const token = sign(
      { id: usercheck._id },
      "jwtSecret",
      {
        expiresIn: "7 days",
      },
      { algorithm: "RS256" }
    );
    return res.json({ token: token });
  }
  return res.json({ error: "wrong username or password" });
}
export async function renewtoken(req, res) {
  const token = sign(
    { id: req.userId },
    "jwtSecret",
    {
      expiresIn: "7 days",
    },
    { algorithm: "RS256" }
  );
  return res.json({ token: token });
}
