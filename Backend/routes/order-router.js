import express from "express"
import Order from "../modules/Order.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51KQwUGSDqjJiCnel8Ob1iTjmIMYUL9rYTogF8wpaqepJ0NBLfuwd0SsVNXltGyhvZAueB3nWvYu4k1wHSObOKaVy00Fepgbu2O');

const orderRoute = express.Router()
// orderRoute.get("/",getOrder);
// orderRoute.get("/all",getAllOrder);
// orderRoute.post("/checkout",storeOrder);

orderRoute.post("/checkout", async (req, res) => {

    const product = await stripe.products.create({
        name: "T-Shirt"
    });


    if (product) {
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 100 * 100,
            currency: 'inr',
        });
    }


    if (price.id) {
        var session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            customer_email: 'demo@gmail.com'

        })
    }

    res.json(session)
}
)
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