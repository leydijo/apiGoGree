import { Router } from "express";
import { quoteSupplierCtrl } from "../controllers/quote";
const router = Router();

router.post("/", quoteSupplierCtrl);

export { router };