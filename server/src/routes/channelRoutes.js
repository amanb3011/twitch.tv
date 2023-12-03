import express from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import {
  getChannelDetails,
  getChannels,
  postFollowChannel,
  getFollowedChannels,
} from "../controllers/controllers.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

const channeldetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

router.get("/followed", verifyToken, getFollowedChannels);

router.post(
  "/follow",
  verifyToken,
  validator.body(channeldetailsSchema),
  postFollowChannel
);

router.get(
  "/:channelId",
  validator.params(channeldetailsSchema),
  getChannelDetails
);

router.get("/", getChannels);

export default router;
