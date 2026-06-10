import express from "express";
import {
  addToCart,
  removeItem,
  updateQuantity,
  getCart
} from "../controller/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.delete("/remove", removeItem);
router.put("/update", updateQuantity);
router.get("/:userId", getCart);

export default router;