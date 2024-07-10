import express from "express"
import Order from "../modules/Order.js";
const orderRoute = express.Router()
// orderRoute.get("/",getOrder);
// orderRoute.get("/all",getAllOrder);
// orderRoute.post("/checkout",storeOrder);
orderRoute.post("/cod", async (req, res) => {
    const { userId, addressId, items, razorpayOrderId, status, paymentMode, order_message, amount, currency, receiptId } = req.body;
    let a = new Date();
    let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()
    const newOrder = new Order({
        userId,
        addressId,
        items,
        totelamount: amount,
        razorpayOrderId: 0,
        dateOfOrder: date,
        status: "success",
        paymentMode,
        order_message: "Order placed"
    })
    try {
        await newOrder.save();
        res.json({ status: "success", message: "success cod" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "data not stored in db", error: err });
    }
});
// orderRoute.post("/validate",validatePaymentStatus )
export default orderRoute;