import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  followedChannels: { type: [{ type: Schema.Types.ObjectId, ref: "Channel" }] },
});

const User = mongoose.model("User", userSchema);

export default User;
