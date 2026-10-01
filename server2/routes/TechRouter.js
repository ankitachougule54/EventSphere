import express from "express";

import {
  createTech,
  getTechs,
  getTechById,
  updateTech,
  deleteTech,
} from "../controllers/TechController.js";

const TechRouter = express.Router();

TechRouter.post("/", createTech);

TechRouter.get("/", getTechs);

TechRouter.get("/:id", getTechById);

TechRouter.put("/:id", updateTech);

TechRouter.delete("/:id", deleteTech);

export default TechRouter;