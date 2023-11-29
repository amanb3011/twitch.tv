import express from "express";
import ExpressValidation from "express-joi-validation";
import Joi from "joi";
import { getChannelDetails, getChannels } from "../controllers/controllers.js";

const router = express.Router();

const channeldetailsSchema = Joi.object({
  channelId: Joi.string().required(),
});

const validator = ExpressValidation.createValidator({});

router.get(
  "/:channelId",
  validator.params(channeldetailsSchema),
  getChannelDetails
);

router.get("/", getChannels);

export default router;
