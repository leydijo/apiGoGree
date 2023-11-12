import { Router } from "express";
import { productCtrl } from "../controllers/products";
const router = Router();

router.post("/", productCtrl);

export { router };