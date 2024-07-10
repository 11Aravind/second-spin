import express from "express"
import Address from "../modules/Address.js"
const addressrouter = express.Router()
addressrouter.get("/", async (req, res) => {
    let addressList;
    try {
        const { userId } = req.query;
        addressList = await Address.find({ userId }); // Corrected here
    } catch (error) {
        return res.status(404).json({ status: "failed", message: `Something went wrong: ${error}`, data: [] });
    }
    if (addressList.length === 0) {
        return res.status(200).json({ status: "failed", message: "Address list empty", data: [] });
    }
    return res.status(200).json({ status: "success", message: "Success", data: { addressList } });
})

addressrouter.post("/store", async (req, res) => {
    const { userId, name, mobileNo, address, order_id } = req.body;
    let userAddress = new Address({
        userId,
        name,
        mobileNo,
        address,
        order_id
    });
    try {
        await userAddress.save();
        return res.status(200).json({ message: "successfuly stored", status: "success", data: userAddress });
    } catch (err) {
        return res.status(200).json({ status: "failed", message: `address not saved ${err}`, data: [] });
    }
});
export default addressrouter;