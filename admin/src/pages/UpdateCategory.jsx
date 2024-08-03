import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios"
import { useParams } from "react-router-dom";
export const UpdateCategory = () => {
    const {categoryId}=useParams()
    const vehicleTypeRef = useRef(null);
    const spairPatsTypeRef = useRef(null);
    const nameRef = useRef(null);
    const imageRef = useRef(null);
  
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
      vehicleType: '',
      spairPatsType: '',
      name: '',
      image: '',
    });
  
    const validateForm = () => {
      let isValid = true;
      const newErrors = {
        vehicleType: '',
        spairPatsType: '',
        name: '',
        image: '',
      };
  
      if (vehicleTypeRef.current.value === "--Select--") {
        newErrors.vehicleType = 'Vehicle type is required';
        isValid = false;
      }
      if (spairPatsTypeRef.current.value === "--Select--") {
        newErrors.spairPatsType = 'Spairparts type is required';
        isValid = false;
      }
      if (!nameRef.current.value) {
        newErrors.name = 'Name is required';
        isValid = false;
      }
      if (!imageRef.current.files[0]) {
        newErrors.image = 'Image is required';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const saveCategory = () => {
      if (!validateForm()) {
        setTimeout(() => {
          setErrors({
            vehicleType: '',
            spairPatsType: '',
            name: '',
            image: '',
          });
        }, 3000);
        return;
      }
  
      const vehicleType = vehicleTypeRef.current.value;
      const spairPatsType = spairPatsTypeRef.current.value;
      const name = nameRef.current.value;
      const imageFile = imageRef.current.files[0];
  
      const categoryData = new FormData();
      categoryData.append('vechicle', vehicleType);
      categoryData.append('spairPatsType', spairPatsType);
      categoryData.append('image', imageFile);
      categoryData.append('partsName', name);
  
      axios.post('http://localhost:5001/api/category/save', categoryData)
        .then((response) => {
          response.data.status === 'success' ? toast.success(response.data.message) : toast.error(response.data.message);
          resetValue();
        })
        .catch((error) => console.log(error));
    };
  
    const resetValue = () => {
      vehicleTypeRef.current.value = '';
      spairPatsTypeRef.current.value = '';
      nameRef.current.value = '';
      imageRef.current.value = '';
    };
  
    return (
      <>
        <div className="content-div">
          <ToastContainer />
          <div className="card-header">
            <div className="card-headding gradient-text ">Update Category</div>
            <div className="errorMessage">{message}</div>
          </div>
          <div className="table-container">
            <div className="row" style={{ padding: '37px' }}>
              <div className="col">
                <label htmlFor="maincat">Vehicle type</label>
                <select
                  className="form-select"
                  id="maincat"
                  ref={vehicleTypeRef}
                  aria-label="Default select example"
                >
                  <option defaultValue="Select" selected>--Select--</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Truck">Truck</option>
                  <option value="Plain">Plain</option>
                </select>
                <small style={{ color: 'red' }}>{errors.vehicleType}</small>
              </div>
  
              <div className="col">
                <label htmlFor="maincat">Spairparts Type</label>
                <select
                  className="form-select"
                  id="maincat"
                  aria-label="Default select example"
                  ref={spairPatsTypeRef}
                >
                  <option defaultValue="Select" selected>--Select--</option>
                  <option value="Parts">Parts</option>
                  <option value="Wheels">Wheels</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Lighting">Lighting</option>
                  <option value="BodyParts">Body Parts</option>
                  <option value="Interior">Interior</option>
                  <option value="Audio&Electronics">Audio & Electronics</option>
                  <option value="AutomotiveTools">Automotive Tools </option>
                  <option value="Specialty">Specialty </option>
                </select>
                <small style={{ color: 'red' }}>{errors.spairPatsType}</small>
              </div>
  
              <div className="col">
                <label htmlFor="category">Image</label>
                <input
                  type="file"
                  id="category"
                  ref={imageRef}
                  className="form-control"
                />
                <small style={{ color: 'red' }}>{errors.image}</small>
              </div>
  
              <div className="col">
                <label htmlFor="category">Parts Name</label>
                <input
                  type="text"
                  id="category"
                  ref={nameRef}
                  className="form-control"
                />
                <small style={{ color: 'red' }}>{errors.name}</small>
              </div>
            </div>
  
            <div className="row" style={{ padding: '16px 37px' }}>
              <button className="btn btn-primary btn-color" onClick={saveCategory}>
                Save
              </button>
            </div>
          </div>
        </div>
        {/* <Subcategory /> */}
      </>
    );
  };
  
  export default UpdateCategory;