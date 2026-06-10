import Cart from "../models/Cart.js";

// Add Item To Cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                message: "User ID and Product ID are required"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });
        } else {
            const item = cart.items.find(
                item => item.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item Added To Cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Remove Item From Cart
export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                message: "User ID and Product ID are required"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item Removed From Cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Update Item Quantity
export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({
                message: "User ID, Product ID and Quantity are required"
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item Not Found In Cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item Quantity Updated",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get User Cart
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Cart Fetched Successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};