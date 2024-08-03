// import ButtonComponent from "../components/ButtonComponent";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { useCart } from "react-use-cart";
// import {loadStripe} from '@stripe/stripe-js';
// import axios from "axios";
// // import { httpRequest } from "../API/api";
// import { fetchAndStoreAddress } from "../Slice/addressSlice"
// import "./css/style.css";
// import "./css/OrderConfirmation.css";
// import Address from "../components/Address"
// import Notfound from "../pages/Notfound"

// export const Checkout = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { isEmpty, items, cartTotal } = useCart();
//   // console.log(items[0]);
//   const [addressId, changeAddressid] = useState(false);
//   const [paymentMode, setPaymentMode] = useState('cod');
//   const [isAddressVisible, setAddressVisible] = useState(false);
//   const addressList = useSelector((state) => state.address.addressList)
//   const userId = JSON.parse(localStorage.getItem("userId"));
//   const onCheckOut = () => {
//     const userId = JSON.parse(localStorage.getItem("userId"));
//     userId === null && navigate("/login");
//     return userId;
//   };
//   useEffect(() => {
//     const userId = onCheckOut();
//     axios.get(`http://localhost:5001/api/address?userId=${userId}`)
//       .then((response) => {
//         // const addressList = response.data.data && response.data.data.addressList;
//         // console.log(response)
//         // if (Array.isArray(addressList)) {
//         //   dispatch(fetchAndStoreAddress(addressList));
//         // } else {
//         //   dispatch(fetchAndStoreAddress([]));
//         // }
//         if (response.data.data.addressList.length === 0)
//           dispatch(fetchAndStoreAddress([]))
//         else {
//           dispatch(fetchAndStoreAddress(response.data.data.addressList))
//         }
//       })
//       .catch((err) => console.error("Error fetching address:", err));
//   }, [dispatch]);


//   const changeAddressVisibility = () => {
//     setAddressVisible(!isAddressVisible)
//   }

//   //payment section
//   const amount = cartTotal ;
//   const currency = "INR";
//   // const receiptId = "qwsaq1";

 


//   return (
//     isEmpty ? <Notfound /> :
//       <div className="container  col-10">
//         <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
//         {addressList.length !== 0 && (
//           addressList.map((address, key) => {
//             return (
//               <div className="form-check" key={key} onClick={() => changeAddressid(address._id)}>
//                 <input className="radioBtn" type="radio" name="flexRadioDefault" id={`address_${key}`} />
//                 <label className="form-check-label" htmlFor={`address_${key}`}>
//                   <b>{address.name}</b> {address.address}
//                 </label>
//                 <div className="remove" id={address._id}
//                 //  onClick={e=>handleRemoveAddress(address._id)}
//                 >
//                   <i className="bi bi-trash3"></i>
//                 </div>
//               </div>
//             )
//           })
//         )}

//         <div className="col-12 ">
//           <button className="addAddressBtn headdingSpace " onClick={() => setAddressVisible(!isAddressVisible)} style={{ "border": "none" }}>+ Add Address</button>
//           {isAddressVisible && <Address changeAddressVisibility={changeAddressVisibility} />}
//         </div>
//         <h5 className="headdingSpace">ORDER SUMMARY</h5>
//         {
//           items.map((item, index) => {
//             return (
//               <div className="col-12 row" style={{ marginBottom: "10px" }} key={index}>
//                 <div className="col-3" style={{ width: "100px" }}>
//                   <img src={`http://localhost:5001/${item[0].image}`} alt="img" />
//                 </div>
//                 <div className="col-3" style={{ fontSize: "13px" }}>{item[0].name}</div>
//                 <div className="col-3" >{item.newPrice}</div>
//                 <div className="col-3" >{item.quantity}</div>
//               </div>
//             )
//           })
//         }
//         <div className="col-12 row">
//           <div className="col-6">Totel Amount</div>
//           <div className="col-6"><b>₹{cartTotal}</b></div>
//         </div>
//         <h5 className="headdingSpace">PAYMENT</h5>
//         <div className="col-12 row">
//           <div className="col-6">
//             <input type="radio"
//               className="cashOnDelivery"
//               name="paymentMode"
//               id="cash"
//               checked={paymentMode == "cod"}
//               onClick={() => setPaymentMode("cod")}
//             />
//             <label htmlFor="cash" className="radioPaymentLabels">Cash on Delivery</label>
//           </div>
//           <div className="col-6">
//             <input type="radio"
//               className="cashOnDelivery"
//               name="paymentMoed"
//               id="online"
//               checked={paymentMode == "online"}
//               onClick={() => setPaymentMode("online")}
//             />
//             <label htmlFor="online" className="radioPaymentLabels">Online Payment</label>
//           </div>
//         </div>
//         <ButtonComponent
//           text="Confirm"
//           classs={addressId == false ? "addbtn checkOutBtn disabled" : "addbtn checkOutBtn"}
//           orderConfirmation={true}
//           onClick={paymentHandler}
//           disableValue={addressId == false ? true : false}
//         />
//       </div>
//   );
// };
import "./css/loader.css"
import ButtonComponent from "../components/ButtonComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { fetchAndStoreAddress } from "../Slice/addressSlice";
import "./css/style.css";
import "./css/OrderConfirmation.css";
import Address from "../components/Address";
import Notfound from "../pages/Notfound";

export const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isEmpty, items, cartTotal } = useCart();
  const [addressId, changeAddressid] = useState(false);
  const [paymentMode, setPaymentMode] = useState("cod");
  const [isAddressVisible, setAddressVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addressList = useSelector((state) => state.address.addressList);
  const userId = JSON.parse(localStorage.getItem("userId"));
  
  const onCheckOut = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    userId === null && navigate("/login");
    return userId;
  };

  useEffect(() => {
    const userId = onCheckOut();
    axios
      .get(`http://localhost:5001/api/address?userId=${userId}`)
      .then((response) => {
        if (response.data.data.addressList.length === 0)
          dispatch(fetchAndStoreAddress([]));
        else {
          dispatch(fetchAndStoreAddress(response.data.data.addressList));
        }
      })
      .catch((err) => console.error("Error fetching address:", err));
  }, [dispatch]);

  const changeAddressVisibility = () => {
    setAddressVisible(!isAddressVisible);
  };

  // Payment section
  const amount = cartTotal;
  const currency = "INR";
  // const paymentHaxndler = async (e) => {

  
  //     const stripe = await loadStripe("pk_test_51KQwUGSDqjJiCnelf5rSP7Ga4kB70od6fYzekLUc0ACE478XmSV1ttQNw5XIjrFJWjtJdYP0m1DfuSZl3NF6P52W00VWFwRASz");
  //     const body = {
  //       products: cartData
  //     }
  //     const headers = {
  //       "Content-Type": "application/json"
  //     }
  //     const response = await fetch("http://localhost:5001/api/order/checkout", {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(body)
  //     });
  //     const session = await response.json();

  //     const result = stripe.redirectToCheckout({
  //       sessionId: session.id
  //     });
  //     if (result.error) {
  //       console.log(result.error);
  //     }
  //   }
  // };
  const paymentHandler = async (e) => {
    setIsLoading(true); // Start the loader
    try {
      const result = items.map((item) => {
        const { name, image } = item[0];
        const { itemTotal, price, quantity } = item;
        return { name, image, itemTotal, price, quantity };
      });

      const cartData = {
        amount,
        currency,
        userId: userId,
        addressId: addressId,
        items: result,
        stripOrderId: "",
        status: paymentMode === "cod" ? "success" : "pending",
        paymentMode: paymentMode,
        order_message: "",
      };

      if (paymentMode === "cod") {
        await axios
          .post("http://localhost:5001/api/order/cod", cartData)
          .then((res) => {
            if (res.data.status === "success") {
              navigate("/orderplaced");
            }
          });
      } else {
        const stripe = await loadStripe(
          "pk_test_51KQwUGSDqjJiCnelf5rSP7Ga4kB70od6fYzekLUc0ACE478XmSV1ttQNw5XIjrFJWjtJdYP0m1DfuSZl3NF6P52W00VWFwRASz"
        );
        const body = {
          products: cartData,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch("http://localhost:5001/api/order/checkout", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });
        const session = await response.json();

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.log(result.error);
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err);
    } finally {
      setIsLoading(false); // Stop the loader
    }
  };

  return isEmpty ? (
    <Notfound />
  ) : (
    <div className="container col-10">
      {isLoading && <Loader />} {/* Show loader when isLoading is true */}
      <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
      {addressList.length !== 0 &&
        addressList.map((address, key) => {
          return (
            <div
              className="form-check"
              key={key}
              onClick={() => changeAddressid(address._id)}
            >
              <input
                className="radioBtn"
                type="radio"
                name="flexRadioDefault"
                id={`address_${key}`}
              />
              <label className="form-check-label" htmlFor={`address_${key}`}>
                <b>{address.name}</b> {address.address}
              </label>
              <div className="remove" id={address._id}>
                {/* Add handleRemoveAddress function if needed */}
                {/* <i className="bi bi-trash3"></i> */}
              </div>
            </div>
          );
        })}

      <div className="col-12 ">
        <button
          className="addAddressBtn headdingSpace"
          onClick={() => setAddressVisible(!isAddressVisible)}
          style={{ border: "none" }}
        >
          + Add Address
        </button>
        {isAddressVisible && <Address changeAddressVisibility={changeAddressVisibility} />}
      </div>
      <h5 className="headdingSpace">ORDER SUMMARY</h5>
      {items.map((item, index) => {
        return (
          <div className="col-12 row" style={{ marginBottom: "10px" }} key={index}>
            <div className="col-3" style={{ width: "100px" }}>
              <img src={`http://localhost:5001/${item[0].image}`} alt="img" />
            </div>
            <div className="col-3" style={{ fontSize: "13px" }}>{item[0].name}</div>
            <div className="col-3">{item.newPrice}</div>
            <div className="col-3">{item.quantity}</div>
          </div>
        );
      })}
      <div className="col-12 row">
        <div className="col-6">Total Amount</div>
        <div className="col-6"><b>₹{cartTotal}</b></div>
      </div>
      <h5 className="headdingSpace">PAYMENT</h5>
      <div className="col-12 row">
        <div className="col-6">
          <input
            type="radio"
            className="cashOnDelivery"
            name="paymentMode"
            id="cash"
            checked={paymentMode === "cod"}
            onClick={() => setPaymentMode("cod")}
          />
          <label htmlFor="cash" className="radioPaymentLabels">Cash on Delivery</label>
        </div>
        <div className="col-6">
          <input
            type="radio"
            className="cashOnDelivery"
            name="paymentMode"
            id="online"
            checked={paymentMode === "online"}
            onClick={() => setPaymentMode("online")}
          />
          <label htmlFor="online" className="radioPaymentLabels">Online Payment</label>
        </div>
      </div>
      <ButtonComponent
        text="Confirm"
        classs={addressId == false ? "addbtn checkOutBtn disabled" : "addbtn checkOutBtn"}
        orderConfirmation={true}
        onClick={paymentHandler}
        disableValue={addressId == false ? true : false}
      />
    </div>
  );
};

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
  </div>
);
