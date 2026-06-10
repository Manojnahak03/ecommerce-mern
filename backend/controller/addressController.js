import Address from "../models/Address.js";

export const saveAddress = async (req,res) =>{
    try {
        const address = await Address.create(req.body);
        res.json({message:"Address Saved Sucessfully !",address});
    } catch (error) {
        res.status(500)
        .json({message:"Internal Address Error",error})
    }
}

// Get Address by user id....
export const getAddresses = async (req,res) =>{
    try {
        const addresses = await Address.find({
            userId:req.params.userId
        });
        res.json(addresses);
    } catch (error) {
        res.status(500)
        .json({message:"Error Fetching Address:",error})
    }
}