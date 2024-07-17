import ButtonComponent from "../components/ButtonComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import axios from "axios";
// import { httpRequest } from "../API/api";
import { fetchAndStoreAddress } from "../Slice/addressSlice"
import "./css/style.css";
import "./css/OrderConfirmation.css";
import Address from "../components/Address"
import Notfound from "../pages/Notfound"
export const Checkout = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isEmpty, items, cartTotal } = useCart();
  console.log(items);
  const [addressId, changeAddressid] = useState(false);
  const [paymentMode, setPaymentMode] = useState('cod');
  const [isAddressVisible, setAddressVisible] = useState(false);
  const addressList = useSelector((state) => state.address.addressList)
  const userId = JSON.parse(localStorage.getItem("userId"));
  const onCheckOut = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    userId === null && navigate("/login");
    return userId;
  };
  useEffect(() => {
    const userId = onCheckOut();
    axios.get(`http://localhost:5001/api/address?userId=${userId}`)
      .then((response) => {
        // console.log("Full Response Data:", response.data); // Log entire response data for debugging
        // Access addressList from the correct nested structure
        const addressList = response.data.data && response.data.data.addressList;
        console.log()
        if (Array.isArray(addressList)) {
          dispatch(fetchAndStoreAddress(addressList));
        } else {
          dispatch(fetchAndStoreAddress([]));
        }
      })
      .catch((err) => console.error("Error fetching address:", err));
  }, [dispatch]);

  const changeAddressVisibility = () => {
    setAddressVisible(!isAddressVisible)
  }

  //payment section
  const amount = cartTotal * 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    // const product = items.map(({ _id, price, quantity }) => {
    //   return { _id, quantity };
    // });
    const body = {
      amount,
      currency,
      receipt: receiptId,
      userId: userId,
      addressId: addressId,
      items: items,
      razorpayOrderId: "",
      status: paymentMode === "cod" ? "success" : "pending",
      paymentMode: paymentMode,
      order_message: "",
    };
    if (paymentMode === "cod") {
      axios.post("http://localhost:5001/api/order/cod", body).then((res) => {
          console.log(res.data.status);
          if (res.data.status === "success")
            navigate("/orderplaced")
        })
        .catch((err) => console.log(err));
      // cod
    } else {
      let response = await axios.post('http://localhost:5001/api/order/checkout',body);

      if(response && response.status === 200 ){
  
        window.location.href = response.data.url
        
        console.log(response.data)}
    }
    // e.preventDefault();
  };


  return (
    isEmpty ? <Notfound /> :
      <div className="container  col-10">
        <h5 className="headdingSpace">DELIVERY ADDRESS</h5>
        {addressList.length !== 0 && (
          addressList.map((address, key) => {
            return (
              <div className="form-check" key={key} onClick={() => changeAddressid(address._id)}>
                <input className="radioBtn" type="radio" name="flexRadioDefault" id={`address_${key}`} />
                <label className="form-check-label" htmlFor={`address_${key}`}>
                  <b>{address.name}</b> {address.address}
                </label>
                <div className="remove" id={address._id}
                //  onClick={e=>handleRemoveAddress(address._id)}
                >
                  <i className="bi bi-trash3"></i>
                </div>
              </div>
            )
          })
        )}

        <div className="col-12 ">
          <button className="addAddressBtn headdingSpace " onClick={() => setAddressVisible(!isAddressVisible)} style={{ "border": "none" }}>+ Add Address</button>
          {isAddressVisible && <Address changeAddressVisibility={changeAddressVisibility} />}
        </div>
        <h5 className="headdingSpace">ORDER SUMMARY</h5>
        {
          items.map((item, index) => {
            return (
              <div className="col-12 row" style={{ marginBottom: "10px" }} key={index}>
                <div className="col-3" style={{ width: "100px" }}>
                  <img src="http://localhost:5001/1711434149628-1_f687340b-634e-41eb-a20d-975a29606913.webp" alt="" />
                </div>
                <div className="col-3" style={{ fontSize: "13px" }}>{item.name}</div>
                <div className="col-3" >{item.newPrice}</div>
                <div className="col-3" >{item.quantity}</div>
              </div>
            )
          })
        }
        <div className="col-12 row">
          <div className="col-6">Totel Amount</div>
          <div className="col-6"><b>₹{cartTotal}</b></div>
        </div>
        <h5 className="headdingSpace">PAYMENT</h5>
        <div className="col-12 row">
          <div className="col-6">
            <input type="radio"
              className="cashOnDelivery"
              name="paymentMode"
              id="cash"
              checked={paymentMode == "cod"}
              onClick={() => setPaymentMode("cod")}
            />
            <label htmlFor="cash" className="radioPaymentLabels">Cash on Delivery</label>
          </div>
          <div className="col-6">
            <input type="radio"
              className="cashOnDelivery"
              name="paymentMoed"
              id="online"
              checked={paymentMode == "online"}
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




