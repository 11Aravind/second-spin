// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef } from "react";
// import axios from "axios"
// import {fetchAndStoreAddress} from "../Slice/addressSlice"
// // import {httpRequest} from "../API/api"
// import { useNavigate } from "react-router";
// const Address = ({ changeAddressVisibility }) => {
//   const dispatch=useDispatch();
//     const navigate = useNavigate()
//     const name = useRef("")
//     const mobile = useRef("")
//     const pincode = useRef("")
//     const locality = useRef("")
//     const address = useRef("")
//     const city = useRef("")
//     const state = useRef("")
//     const addressList = useSelector((state) => state.address.addressList)
//     const userId = JSON.parse(localStorage.getItem("userId"));
//     // console.log(userId);

//     const onCheckOut = () => {
//       userId === null && navigate("/login") ;
//       return userId;
//     };
//     useEffect(() => {
//       const userId = onCheckOut();
//       userId === null && navigate("/login")
//     }, [userId])
//     // useEffect(() => {
//     //   const fetchAddress = () => {
//     //     return new Promise((resolve, reject) => {
//     //       const userId = onCheckOut(); // Ensure this function is defined and returns the correct userId
  
//     //       axios.get(`http://localhost:5001/api/address?userId=${userId}`)
//     //         .then((response) => {
//     //           // Log entire response data for debugging
//     //           console.log("Full Response Data:", response.data);
  
//     //           // Access addressList from the correct nested structure
//     //           const addressList = response.data.data && response.data.data.addressList;
  
//     //           if (Array.isArray(addressList)) {
//     //             resolve(addressList);
//     //           } else {
//     //             resolve([]);
//     //           }
//     //         })
//     //         .catch((err) => {
//     //           console.error("Error fetching address:", err);
//     //           reject(err);
//     //         });
//     //     });
//     //   };
  
//     //   fetchAddress()
//     //     .then((addressList) => {
//     //       dispatch(fetchAndStoreAddress(addressList));
//     //     })
//     //     .catch((err) => {
//     //       console.error("Error dispatching address:", err);
//     //     });
//     // }, [dispatch]);
//     const saveAddress = () => {
//       const addressData = {
//         "userId": userId,
//         "name": name.current.value,
//         "mobileNo": mobile.current.value,
//         "address": address.current.value + ",  " + locality.current.value + ",  " + city.current.value + ",  " + pincode.current.value + ", " + state.current.value,
//         "order_id": null,
//       }
//       // const dispatch=useDispatch();
//       axios.post("http://localhost:5001/api/address/store", addressData)
//         .then((res) => {
//           console.log(res)
//           // addressList.push(res.data);
//           const newAdddress=[...addressList,res.data]
//           // console.log(newAdddress);
//           dispatch(fetchAndStoreAddress(newAdddress))
//           // const addressList = useSelector((state) => state.address.addressList);
//           // dispatch(fetchAndStoreAddress(addressList));
//           changeAddressVisibility();
  
//         })
//         .catch((error) => console.log(error));
//     }
//     return (
//       <>
//         <form className=" container row g-3">
//           <div className="col-md-6">
//             <label htmlFor="inputEmail4" className="form-label">Name</label>
//             <input type="text" className="form-control" ref={name} id="inputEmail4" />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputPassword4" className="form-label">Mobile No</label>
//             <input type="Number" className="form-control" ref={mobile} id="inputPassword4" />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputEmail4" className="form-label">Pincode</label>
//             <input type="text" className="form-control" ref={pincode} id="inputEmail4" />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputPassword4" className="form-label">Locality</label>
//             <input type="text" className="form-control" ref={locality} id="inputPassword4" />
//           </div>
//           <div className="col-12">
//             <label htmlFor="inputAddress" className="form-label">Address</label>
//             <input type="text" className="form-control" ref={address} id="inputAddress" placeholder="" />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputEmail4" className="form-label">City</label>
//             <input type="text" className="form-control" ref={city} id="inputEmail4" />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputPassword4" className="form-label">State</label>
//             <input type="text" className="form-control" ref={state} id="inputPassword4" />
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//               <button type="button" className="checkOutBtn cancelBtn" onClick={changeAddressVisibility}>CANCEL</button>
//             </div>
//             <div className="col-md-6">
//               <button type="button" className="checkOutBtn" onClick={saveAddress}>Confirm</button>
//             </div>
//           </div>
//         </form>
//       </>
//     );
//   }
//   export default Address;
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { fetchAndStoreAddress } from "../Slice/addressSlice";
import { useNavigate } from "react-router";

const Address = ({ changeAddressVisibility }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef("");
  const mobileRef = useRef("");
  const pincodeRef = useRef("");
  const localityRef = useRef("");
  const addressRef = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const addressList = useSelector((state) => state.address.addressList);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [localityError, setLocalityError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");

  const onCheckOut = () => {
    if (!userId) {
      navigate("/login");
      return null;
    }
    return userId;
  };

  useEffect(() => {
    onCheckOut();
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (nameRef.current.value.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (mobileRef.current.value.trim() === "") {
      setMobileError("Mobile number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(mobileRef.current.value.trim())) {
      setMobileError("Invalid mobile number");
      isValid = false;
    } else {
      setMobileError("");
    }

    if (pincodeRef.current.value.trim() === "") {
      setPincodeError("Pincode is required");
      isValid = false;
    } else if (!/^\d+$/.test(pincodeRef.current.value.trim())) {
      setPincodeError("Pincode must be numeric");
      isValid = false;
    } else {
      setPincodeError("");
    }

    if (localityRef.current.value.trim() === "") {
      setLocalityError("Locality is required");
      isValid = false;
    } else {
      setLocalityError("");
    }

    if (addressRef.current.value.trim() === "") {
      setAddressError("Address is required");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (cityRef.current.value.trim() === "") {
      setCityError("City is required");
      isValid = false;
    } else {
      setCityError("");
    }

    if (stateRef.current.value.trim() === "") {
      setStateError("State is required");
      isValid = false;
    } else {
      setStateError("");
    }

    return isValid;
  };

  const saveAddress = () => {
    if (validateForm()) {
      const addressData = {
        userId: userId,
        name: nameRef.current.value.trim(),
        mobileNo: mobileRef.current.value.trim(),
        address: `${addressRef.current.value.trim()}, ${localityRef.current.value.trim()}, ${cityRef.current.value.trim()}, ${pincodeRef.current.value.trim()}, ${stateRef.current.value.trim()}`,
        order_id: null,
      };

      axios
        .post("http://localhost:5001/api/address/store", addressData)
        .then((res) => {
          const newAddress = [...addressList, res.data];
          dispatch(fetchAndStoreAddress(newAddress));
          changeAddressVisibility();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form className="container row g-3">
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            ref={nameRef}
            id="inputEmail4"
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Mobile No
          </label>
          <input
            type="text"
            className="form-control"
            ref={mobileRef}
            id="inputPassword4"
          />
          {mobileError && <p className="error-message">{mobileError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Pincode
          </label>
          <input
            type="text"
            className="form-control"
            ref={pincodeRef}
            id="inputEmail4"
          />
          {pincodeError && <p className="error-message">{pincodeError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Locality
          </label>
          <input
            type="text"
            className="form-control"
            ref={localityRef}
            id="inputPassword4"
          />
          {localityError && <p className="error-message">{localityError}</p>}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            ref={addressRef}
            id="inputAddress"
            placeholder=""
          />
          {addressError && <p className="error-message">{addressError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            ref={cityRef}
            id="inputEmail4"
          />
          {cityError && <p className="error-message">{cityError}</p>}
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            ref={stateRef}
            id="inputPassword4"
          />
          {stateError && <p className="error-message">{stateError}</p>}
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="checkOutBtn cancelBtn"
              onClick={changeAddressVisibility}
            >
              CANCEL
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="checkOutBtn"
              onClick={saveAddress}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Address;

