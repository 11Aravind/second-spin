import express from "express"
import Order from "../modules/Order.js";
import Stripe from 'stripe';
// const stripe = require("stripe")("sk_test_51KQwUGSDqjJiCnel8Ob1iTjmIMYUL9rYTogF8wpaqepJ0NBLfuwd0SsVNXltGyhvZAueB3nWvYu4k1wHSObOKaVy00Fepgbu2O");
const stripe = new Stripe("sk_test_51KQwUGSDqjJiCnel8Ob1iTjmIMYUL9rYTogF8wpaqepJ0NBLfuwd0SsVNXltGyhvZAueB3nWvYu4k1wHSObOKaVy00Fepgbu2O");
const orderRoute = express.Router()
// orderRoute.get("/all",getAllOrder);
// orderRoute.post("/checkout",storeOrder);
orderRoute.get("/", async (req, res) => {
    let orderDetails;
    const { userId } = req.query;
    try {
        orderDetails = await Order.find({ userId })
    } catch (error) {
        console.log(error);
    }
    if (orderDetails.length !== 0)
        res.status(200).json({ status: "success", message: "", data: orderDetails })
    else
        res.status(400).json({ status: "success", messgae: "order was empty", data: orderDetails })
});

orderRoute.post("/checkout", async (req, res) => {
    const { userId, addressId, items, stripOrderId, status, paymentMode, order_message, amount, currency } = req.body;
    const { products } = req.body;
    let a = new Date();
    let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() 
    // console.log(products.amount);
    const baseURL = 'http://localhost:5173/';
    const lineItems = products.items.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name,
                // images:[product.image]
                images: [`${baseURL}${product.image}`] // Prepend baseURL to the image filename
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));
    try {
        const newOrder = new Order({
            userId: products.userId,
            addressId: products.addressId,
            items: products.items,
            totelamount: products.amount,
            stripOrderId: 0,
            dateOfOrder: date,
            status: "success",
            paymentMode: products.paymentMode,
            order_message: "Order placed"
        })
        const savedOrder = await newOrder.save();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/Orderplaced",
            cancel_url: "http://localhost:3000/cancel",
        });
        savedOrder.stripOrderId = session.id;
        await savedOrder.save();
        // console.log(session.id);
        res.json({ id: session.id })
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal server error' });
    }






    // if (price.id) {
    //     var session = await stripe.checkout.sessions.create({
    //         line_items: [
    //             {
    //                 price: `${price.id}`,
    //                 quantity: 1,
    //             }
    //         ],
    //         mode: 'payment',
    //         success_url: 'http://localhost:3000/success',
    //         cancel_url: 'http://localhost:3000/cancel',
    //         // customer_email: 'demo@gmail.com'

    //     })
    // }

    // res.json(session)
}
)
orderRoute.post("/cod", async (req, res) => {
    const { userId, addressId, items, stripOrderId, status, paymentMode, order_message, amount, currency } = req.body;
    let a = new Date();
    let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() 
    const newOrder = new Order({
        userId,
        addressId,
        items,
        totelamount: amount,
        stripOrderId: 0,
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

// export const validatePaymentStatus = async (req, res) => {
//     const { amount, currency, userId, addressId, items, stripOrderId, status, paymentMode, order_message } = products;
//   let a = new Date();
//     let date = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()
//     try {
//         const newOrder = new Order({
//             userId,
//             addressId,
//             items,
//             totelamount: amount,
//             stripOrderId: id,
//             dateOfOrder: date,
//             status: "success",
//             paymentMode,
//             order_message: "Order placed"
//         })
//         await newOrder.save();
//         res.json({ status: "success", message: "success cod" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: "data not stored in db", error: err });
//     }
// }
orderRoute.get("/all", async (req, res) => {
    let orderDetails;
    try {
        orderDetails = await Order.find()
    } catch (error) {
        console.log(error);
    }
    if (orderDetails.length !== 0)
        res.status(200).json({ status: "success", message: "", data: orderDetails })
    else
        res.status(400).json({ status: "success", messgae: "order was empty", data: orderDetails })
});
orderRoute.put("/cancelOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId);
        const updatedUser = await Order.findByIdAndUpdate(
            orderId,
            { $set: { order_message: "Order Canceled" } },
            { new: true } // return the updated document
        );
        if (!updatedUser) {
            return res.status(404).send({ message: `order not found ${updatedUser}` });
        }
        res.status(200).send({ status: "success", message: "order was canceled" });
    } catch (err) {
        res.status(400).json({ status: "failed", messgae: `something went wrong ${err}` })

    }
})
orderRoute.post("/updateStatus",async(req, res) => {
    try {
        const { id, order_message } = req.body
        const order = await Order.findByIdAndUpdate(
            id,
            { order_message },
        );
        if (order) {
            res.status(200).json({ message: "Order updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });

    }
})