// import { useEffect, useState } from "react";
// // import { httpRequest } from "../API/api";
// // import { httpRequest } from "../api";
// import axios from "axios"
// import "./css/orders.css"
// import { useSelector } from "react-redux"
// const Orders = () => {
//   const userId = JSON.parse(localStorage.getItem("userId"));
//   const products = useSelector((state) => state.products.productList);
//   const imgPath = useSelector((state) => state.common.imagePath);
//   const addressArray = useSelector((state) => state.address.addressList);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [address, setAddress] = useState(null);

//   const toggleAddress = (id) => {
//     setSelectedRow(selectedRow === id ? null : id);
//   }

//   useEffect(() => {
//     axios.get(`http://localhost:5001/api/address?userId=${userId}`)
//     .then((response) => {
//       setAddress(response.data.data.addressList);
//     })
//     .catch((err)=>console.log(err))
//     axios.get(`http://localhost:5001/api/order/?userId=${userId}`)
//       .then((res) => {
//         let orders = res.data.data;
//         console.log(res.data.data);

//         // const ordersWithProductNames = orders.map((order) => {
//         //   const itemsWithProductNames = order.items.map((item) => {
//         //     const product = products.find((product) => product._id === item.id);
//         //     return { ...item, 
//         //       name: product.name, 
//         //       image: product.image, 
//         //       description: product.description, 
//         //       newPrice: product.newPrice 
//         //     };
//         //   });
//         //   return { ...order, items: itemsWithProductNames };
//         // });
//         setOrders(ordersWithProductNames);
//         console.log(ordersWithProductNames);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [userId, products]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const getAddressById = (addressId) => {
//     return addressArray.find(address => address._id === addressId);
//   }


//   return (
//     <div className="container">
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//        <div className="main">
//         <div className="left-filter">
//           <ul className="filter-ul">
//           <div className="mediumfont">Filters   :     </div>
//             <li><div><input type="checkbox" className="checkbox" />On the way</div></li>
//             <li><div><input type="checkbox" className="checkbox" />Delivered</div></li>
//             <li><div><input type="checkbox" className="checkbox" />Cancelled</div></li>
//           </ul>

//         </div>
//         <div className="right-order">
//           {
//              orders.map((order, index) => {
//               const address = addressArray.find((item) => item._id === order.addressId);
//               return (
//                 <div key={index}>
//                   {order.items.map((item, key) => (
//                    <div className="order-container">
//                      <div className="order-row" key={key} onClick={()=>toggleAddress(order._id)}>
//                       <div className="img">
//                         <img src={imgPath + item.image} alt="img" />
//                       </div>
//                       <div className="order-description">
//                         <p>{item.name}</p>
//                         <p>  <b>₹</b>{item.newPrice}  <b>Qnty-</b>{item.quantity} </p>

//                         {/* Quantity: {item.quantity}<br />
//                         Payment Mode: {order.paymentMode}, Date: {order.dateOfOrder}<br />
//                         Address: {address ? address.address : 'Address not found'} */}
//                       </div>
//                       {/* <div className="mediumfont">
//                     <br />
//                       </div> */}
//                       <div className="cancel-order">
//                         {/* <button className="cancelBtn" id={order._id}>cancel</button> */}
//                        <div className="flag-conatiner"> 
//                        <span className="order-flag"></span>
//                             <span style={{    "fontWeight": "600"}}> Delivered on Apr 09</span>
//                        </div>
//                         <span>Your item has been delivered</span>
//                       </div>
//                     </div>
//                     {selectedRow===order._id &&(  <div className="deliver-address">
//                         <div className="address-left">
//                           <div className="address-headding mediumfont">Delivery Address</div>
//                           {/* <div className="desc">Sreenandanam, Muthupilakkad kizhakku Kunnathur Subdistrict, Kollam District - 690520, Kerala</div> */}
//                           <div className="desc"> {address ? address.address : 'Address not found'} </div>
//                           <div className="head mediumfont">Phone number</div>
//                           <span>8848310248, 8129365304</span>
//                         </div>
//                         <div className="address-right">
//                      <div className="address-headding mediumfont">More actions</div>   
//                      <div className="desc">Download Invoice</div>
//                         </div>
//                       </div>)   }

//                     </div>
//                   ))}
//                 </div>
//               );
//             })
//           }
//         </div>
//        </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./css/orders.css";

const Orders = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const products = useSelector((state) => state.products.productList);
  const imgPath = useSelector((state) => state.common.imagePath);
  // const addressArray = useSelector((state) => state.address.addressList);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [addresses, setaddresses] = useState([])
  // console.log(addresses);
  const toggleAddress = (id) => {
    setSelectedRow(selectedRow === id ? null : id);
    console.log(selectedRow);
  };

  useEffect(() => {
    const fetchOrdersAndAddresses = async () => {
      try {
        const [addressResponse, ordersResponse] = await Promise.all([
          axios.get(`http://localhost:5001/api/address?userId=${userId}`),
          axios.get(`http://localhost:5001/api/order/?userId=${userId}`)
        ]);

        setaddresses(addressResponse.data.data.addressList);
        const orders = ordersResponse.data.data.map(order => {
          const itemsWithProductDetails = order.items.map(item => {
            const product = products.find(product => product._id === item.id);
            return {
              ...item,
              name: product ? product.name : item.name,
              image: product ? product.image : item.image,
              description: product ? product.description : '',
              newPrice: product ? product.newPrice : item.price
            };
          });
          return {
            ...order,
            items: itemsWithProductDetails,
            paymentMode: order.paymentMode,
            order_message: order.order_message
          };
        });

        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchOrdersAndAddresses();
  }, [userId, products]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const cancelOrder = (e) => {
    const userConfirmed = window.confirm('Do you want to cancel the order?');
    if (userConfirmed) {
      // Your cancellation logic here
      console.log('Order has been cancelled.');
      const orderId = e.target.id
      axios.put(`http://localhost:5001/api/order/cancelOrder/${orderId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
      // You can also call a function to handle the cancellation
      // e.g., cancelOrder();
    } else {
      console.log('Order cancellation was aborted.');
    }
  }

  return (
    <div className="container">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="main">
          <div className="right-order">
            {orders.map((order, index) => {
              const address = addresses.find(addr => addr._id === order.addressId);
              return (
                <div className="order-container" key={index}>
                  {order.items.map((item, key) => (
                    <div key={key} >
                      <div className="order-row" onClick={() => toggleAddress(order._id)}>
                        <div className="img">
                          <img src={`${imgPath}${item.image}`} alt="img" />
                        </div>
                        <div className="order-description">
                          <p>{item.name}</p>
                          <p><b>₹</b>{item.newPrice} <b>Qnty-</b>{item.quantity}</p>
                        </div>
                        <div className="cancel-order">
                          <div className="flag-container d-flex">
                            <span className={order.order_message !== "Order Canceled" ? "order-flag-success" : "order-flag-failed"}></span>
                            <span style={{ fontWeight: "600" }}> {order.order_message}</span>
                          </div>
                       {order.order_message !== "Order Canceled" &&  <span><button id={order._id} onClick={(e) => cancelOrder(e)}>cancel order</button></span>}
                        </div>
                       { selectedRow !== order._id?<i className="bi bi-chevron-right"></i>: <i className="bi bi-chevron-down"></i>}
                        
                       
                      </div>
                      {selectedRow === order._id && (
                        <div className="deliver-address">
                          <div className="address-left">
                            <div className="address-heading mediumfont">Delivery Address</div>
                            <div className="desc">{address ? address.address : 'Address not found'}</div>
                            <div className="head mediumfont">Phone number</div>
                            <span>{address.mobileNo}</span>
                          </div>
                          <div className="address-right">
                            <div className="address-heading mediumfont">More actions</div>
                            <div className="desc"><button>Download Invoice</button></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
