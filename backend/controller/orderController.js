import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Get User Cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Prepare Order Items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // Calculate Total Price
    const totalPrice = orderItems.reduce(
      (total, item) =>
        total + item.quantity * item.price,
      0
    );

    // Update Product Stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // Create Order
    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalPrice,
      paymentMethod: "COD",
      status: "Placed",
    });

    // Clear Cart
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Place Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};