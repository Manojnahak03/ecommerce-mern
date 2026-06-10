import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product Created Successfully !!",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Products
export const getProduct = async (req, res) => {
    try {
        const {search,category} = req.query;
        let filter ={};

        if(search){
            filter.title={$regex:search,$options:"i"}; //Case sensitive Search

        }
        if(category){
            filter.category=category;
        }
        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.json({
            message: "Products Found Successfully",
            products
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Product Updated Successfully",
            updated
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};