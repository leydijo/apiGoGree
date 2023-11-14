import { Router } from "express";
import express from 'express';
import { allCustomers,customerCtrl } from "../controllers/customers";
const router = Router();

router.get("/all", allCustomers);
router.post("/", customerCtrl);

export { router };