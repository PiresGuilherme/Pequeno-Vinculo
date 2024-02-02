import { Router } from "express";
import multer from "multer"
import { FileController } from "../controllers/FileController";

const router = Router();

router.get("/")