import { Router } from "express";
import { customerCtrl } from "../controllers/customers";
const router = Router();

router.post("/", customerCtrl);

export { router };