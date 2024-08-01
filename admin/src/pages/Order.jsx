// import { useEffect, useState, useRef } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios"
// import "./CSS/order.css"
// import { useSelector } from "react-redux"
// const combineOrdersAndAddresses = (orders, addressList) => {
//     return orders.map(order => {
//         // Find the corresponding address
//         const address = addressList.find(addr => addr._id === order.addressId);
//         if (!address) return null;

//         // Extract order details
//         return order.items.map(item => ({
//             orderId: order._id,
//             productName: item.name,
//             address: address.address,
//             phoneNumber: address.mobileNo,
//             itemTotal: item.itemTotal,
//             quantity: item.quantity,
//             dateOfOrder: order.dateOfOrder,
//             orderMessage: order.order_message,
//             paymentMode: order.paymentMode
//         }));
//     }).flat().filter(entry => entry !== null); // Flatten and remove null values
// };

// const Order = () => {
//     const tableHeadding = [
//         { th: "#id" },
//         { th: "Name" },
//         { th: "addressId" },
//         { th: "tAmount" },
//         { th: "Mode" },
//         { th: "Date" },
//         { th: "message" },
//         { th: "status" },
//         { th: "Action" },
//     ];
//     const messsageRef = useRef(null);

//     const [orders, setOrders] = useState([])
//     const [addressList, setAddressList] = useState([])
//     const [orderId, setOrderId] = useState();
//     const [orderUpdate, setOrderUpdate] = useState(false);
//     const [combinedList, setCombinedList] = useState([]);

//     const visibility = useSelector((state) => state.visibility.visibility)
//     const handleEditing = (id) => {
//         setOrderId(id);
//         setOrderUpdate(true);
//     };
//     const updateOrderStatus = () => {
//         const data = {
//             "id": orderId,
//             "order_message": messsageRef.current.value
//         };
//         axios.post('http://localhost:5001/api/order/updateStatus', data)
//             .then((res) => {
//                 toast.success('Order status was updated!');
//                 setOrderUpdate(false);
//                 // Update the order in the state
//                 setOrders(prevOrders =>
//                     prevOrders.map(order =>
//                         order._id === orderId ? { ...order, order_message: data.order_message } : order
//                     )
//                 );
//             })
//             .catch((err) => toast.error('Order status not Updated!'));
//     };
//     useEffect(() => {
//         axios.get('http://localhost:5001/api/order/all')
//             .then((res) => {
//                 setOrders(res.data.data)
//             })
//             .catch((err) => console.log(err));
//         axios.get(`http://localhost:5001/api/address/all`)
//             .then((res) => setAddressList(res.data.data.addressList))
//             .catch(err => console.log(err))
//             setCombinedList(combineOrdersAndAddresses(orders, addressList))

//     }, [])
//     console.log(combinedList);
//     return (
//         <div className={visibility ? "flat-container" : "content-div"} >
//             <ToastContainer />
//             <div className="card-header">
//                 <div className="card-headding gradient-text">Order Details</div>
//                 <div className="top-button"></div>
//             </div>
//             <table className="table-container table">
//                 <thead>
//                     <tr className="table-headding">
//                         {
//                             tableHeadding.map((eachHeadding, id) =>
//                                 <td key={id}>{eachHeadding.th}</td>
//                             )
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         combinedList.map((entry, id) =>{
//                             <tr key={id} scope="row">
//                                 <td>{id + 1}</td>
//                                 <td>{entry.orderId}</td>
//                                 <td>{entry.productName}</td>
//                                 <td>{entry.address}</td>
//                                 <td>{entry.phoneNumber}</td>
//                                 <td>{entry.itemTotal}</td>
//                                 <td>{entry.quantity}</td>
//                                 <td>{entry.dateOfOrder}</td>
//                                 <td>{entry.orderMessage}</td>
//                                 <td>{entry.paymentMode}</td>
//                                 {/* <td>{order.userId}</td>
//                                 <td>{order.addressId}</td>
//                                 <td>{order.totelAmount}</td>
//                                 <td>{order.paymentMode}</td>
//                                 <td>{order.dateOfOrder}</td> */}
//                                 {/* <td style={order.order_message === "Order Canceled" ? { color: "red", fontWeight: 500 } : {}}>
//                                     {order.order_message}
//                                 </td>
//                                 <td>{order.status}</td>
//                                 {
//                                     order.order_message !== "Order Canceled" &&
//                                     <td onClick={() => handleEditing(order._id)} id={order._id}>
//                                         <i className="bi bi-pencil-square"></i>
//                                     </td> */}
//                             </tr>
//                                 }
//                         )
//                     }
//                 </tbody>
//             </table>
//             {orderUpdate &&
//                 <div className="update-status">
//                     <div className="box-title"><h5 className="modal-title">Update Order</h5></div> <hr />
//                     <div className="body">
//                         <select ref={messsageRef}>
//                             <option value="Order Placed">Order Placed</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Out For Deliver">Out For Deliver</option>
//                             <option value="Delivered">Delivered</option>
//                         </select>
//                     </div> <hr />
//                     <div className="footer">
//                         <button className="gray-btn footer-btn" onClick={() => setOrderUpdate(false)}>Cancel</button>
//                         <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }
// export default Order;

import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./CSS/order.css";
import { useSelector } from "react-redux";

const combineOrdersAndAddresses = (orders, addressList) => {
    return orders.map(order => {
        // Find the corresponding address
        const address = addressList.find(addr => addr._id === order.addressId);
        if (!address) return null;

        // Extract order details
        return order.items.map(item => ({
            orderId: order._id,
            productName: item.name,
            address: address.address,
            phoneNumber: address.mobileNo,
            itemTotal: item.itemTotal,
            quantity: item.quantity,
            dateOfOrder: order.dateOfOrder,
            orderMessage: order.order_message,
            paymentMode: order.paymentMode
        }));
    }).flat().filter(entry => entry !== null); // Flatten and remove null values
};

const Order = () => {
    const tableHeading = [
        { th: "#id" },
        { th: "Product Name" },
        { th: "Address" },
        { th: "Item Total" },
        { th: "Qny" },
        { th: "Date of Order" },
        { th: "Order Message" },
        { th: "pay Mode" },
        { th: "Action" },
    ];
    const messageRef = useRef(null);

    const [orders, setOrders] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [orderId, setOrderId] = useState();
    const [orderUpdate, setOrderUpdate] = useState(false);
    const [combinedList, setCombinedList] = useState([]);

    const visibility = useSelector((state) => state.visibility.visibility);

    const handleEditing = (id) => {
        console.log(id); // This will print the correct ID
        setOrderId(id);
        setOrderUpdate(true);
    };
    

    const updateOrderStatus = () => {
        const data = {
            "id": orderId,
            "order_message": messageRef.current.value
        };
        axios.post('http://localhost:5001/api/order/updateStatus', data)
            .then((res) => {
                toast.success('Order status was updated!');
                setOrderUpdate(false);
                // Update the order in the state
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, order_message: data.order_message } : order
                    )
                );
            })
            .catch((err) => toast.error('Order status not Updated!'));
    };

    useEffect(() => {
        const fetchOrders = axios.get('http://localhost:5001/api/order/all');
        const fetchAddresses = axios.get('http://localhost:5001/api/address/all');

        Promise.all([fetchOrders, fetchAddresses])
            .then(([ordersResponse, addressesResponse]) => {
                setOrders(ordersResponse.data.data);
                setAddressList(addressesResponse.data.data.addressList);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (orders.length > 0 && addressList.length > 0) {
            setCombinedList(combineOrdersAndAddresses(orders, addressList));
        }
    }, [orders, addressList]);
console.log(combinedList);
    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <ToastContainer />
            <div className="card-header">
                <div className="main-menu-headding  gradient-text">Order Details</div>
                <div className="top-button"></div>
            </div>
            <table className="table-container table">
                <thead>
                    <tr className="table-heading">
                        {tableHeading.map((heading, id) => (
                            <td key={id}>{heading.th}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {combinedList.map((entry, id) => (
                        <tr key={id} scope="row">
                            <td>{id + 1}</td>
                            <td>{entry.productName}</td>
                            <td>{entry.address},{entry.phoneNumber}</td>
                            {/* <td></td> */}
                            <td>{entry.itemTotal}</td>
                            <td>{entry.quantity}</td>
                            <td>{entry.dateOfOrder}</td>
                            {/* <td>{entry.orderMessage}</td> */}
                            <td style={entry.orderMessage === "Order Canceled" ? { color: "red", fontWeight: 500 } : {}}>
                                {entry.orderMessage}
                            </td>
                            <td>{entry.paymentMode}</td>
                            {/* <td>
                                {entry.orderMessage !== "Order Canceled" &&
                                    <button onClick={() => handleEditing(entry.orderId)}>Edit</button>
                                }
                            </td> */}
                            {
                                entry.orderMessage !== "Order Canceled" &&
                                <td onClick={() => handleEditing(entry.orderId)} id={entry.orderId}>
                                <i className="bi bi-pencil-square"></i>
                            </td>
                            
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            {orderUpdate &&
                <div className="update-status">
                    <div className="box-title"><h5 className="modal-title">Update Order</h5></div> <hr />
                    <div className="body">
                        <select ref={messageRef}>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div> <hr />
                    <div className="footer">
                        <button className="gray-btn footer-btn" onClick={() => setOrderUpdate(false)}>Cancel</button>
                        <button className="footer-btn" onClick={updateOrderStatus}>Update</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Order;
