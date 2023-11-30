import bcrypt from "bcryptjs";

import User from "../../models/User.js";

export const patchChangePassword = async (req, res) => {
  try {
    const { userId } = req.user;

    const { password, newPassword } = req.body;

    const userData = await User.findById(userId, { password: 1 });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("invalid password. Please try again");
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ _id: userId }, { password: encryptedPassword });

    return res.status(200).send("password changed succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};
