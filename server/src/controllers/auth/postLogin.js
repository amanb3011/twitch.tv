import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
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

      return res.status(200).json({
        userDetails: {
          email: user.email,
          username: user.username,
          token,
        },
      });
    }

    return res.status(400).send("invalid credentials. please try again");
  } catch (error) {
    console.log(error);
    return res.status(500).send("error occured. please try again");
  }
};
