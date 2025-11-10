import { Router } from "express";
import { getExampleData } from "../controllers/exampleController";

const router = Router();

router.get("/example", getExampleData);

export default router;
