import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import Channel from "../../models/Channel.js";

export const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await User.exists({ email: email.toLowerCase() });

    if (existUser) {
      return res.status(409).send("email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newChannel = await Channel.create({});

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      channel: newChannel._id,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res.status(201).json({
      userDetails: {
        email: user.email,
        username,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error occured. please try again");
  }
};
