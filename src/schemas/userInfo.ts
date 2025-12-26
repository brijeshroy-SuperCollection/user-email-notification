import Joi from "joi";
import { USER_CATEGORY_KEYS} from "../constants/project-constants";

export const USER_INFO_SCHEMA = Joi.object({
    name:Joi.string().min(1).max(25).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(1).max(25).required(),
    category:Joi.string()
    .valid(...USER_CATEGORY_KEYS)
    .insensitive()
    .required(),
})