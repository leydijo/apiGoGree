import { Router } from "express";
import { loginCtrl } from "../controllers/login";
const router = Router();

router.post("/", loginCtrl);

export { router };