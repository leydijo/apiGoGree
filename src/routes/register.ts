import { Router } from "express";
import { registerCtrl } from "../controllers/register";
import { checkJwt } from "../middleware/session";
const router = Router();

router.post("/", registerCtrl.registerUser);

export { router };