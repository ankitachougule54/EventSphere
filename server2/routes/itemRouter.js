import express from "express";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/ItemController.js";
import upload from "../middlewares/upload.js";

const itemRouter = express.Router();

itemRouter.post("/", upload.single("itemImage"), createItem);
itemRouter.get("/", getItems);
itemRouter.get("/:id", getItemById);
itemRouter.put("/:id", upload.single("itemImage"), updateItem);
itemRouter.delete("/:id", deleteItem);

export default itemRouter;