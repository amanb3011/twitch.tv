import User from "../../models/User.js";

export const postFollowChannel = async (req, res) => {
  try {
    const { channelId } = req.body;

    const { userId } = req.user;

    const userData = await User.findById(userId, { followedChannels: 1 });

    if (userData.followedChannels.includes(channelId)) {
      return res.status(400).send("You are already following this channel");
    }

    userData.followedChannels.push(channelId);

    await userData.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong.please try again");
  }
};
