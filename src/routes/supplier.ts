import { Router } from "express";
import { newSupplier,allSupplier } from "../controllers/supplier";
import { checkJwt } from "../middleware/session";
const router = Router();

router.post("/", newSupplier);
router.get("/all", allSupplier);
export { router };