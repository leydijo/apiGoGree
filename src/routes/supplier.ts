import { Router } from "express";
import { supplierCtrl } from "../controllers/supplier";
import { checkJwt } from "../middleware/session";
const router = Router();

router.post("/", supplierCtrl);

export { router };