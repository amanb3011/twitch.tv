import mongoose, { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

const defaultTitle = "new channel";
const defaultDescription = "this is new channel description";

const channelSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  title: { type: String, default: defaultTitle },
  description: { type: String, default: defaultDescription },
  avatarUrl: { type: String, default: "none" },
  streamKey: { type: String, default: uuid() },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    default: [],
  },
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
