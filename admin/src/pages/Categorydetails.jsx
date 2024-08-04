import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios"
export const Categorydetails = () => {
  const [categorys, setCategoryDetails] = useState([]);
  const [subCategorys, setSubCategoryList] = useState([]);
  const visibility = useSelector((state) => state.visibility.visibility)
  const deleteCategory = (e) => {
    const category_id = e.target.id;
    const url = `http://localhost:5001/api/category/${category_id}`;
    axios.delete(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "success") {
          toast.success(res.data.message, {
            position: 'top-right',
            autoClose: 3000,
          });
          setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
        }
        else {
          toast.error(res.data.message, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
  }
  useEffect(() => {
    axios.get("http://localhost:5001/api/category/subcategory").then(res => setSubCategoryList(res.data.payload))
      .catch(err => console.log(err))

    axios.get("http://localhost:5001/api/category").then((res) => {
      setCategoryDetails(res.data.payload);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);
  const tableHeadding = [{ th: "#id" }, { th: "vechicle" }, { th: "partsName" }, { th: "partsName" }, { th: "image" }, { th: "Action" },];
  return (
    <div className={visibility ? "flat-container" : "content-div"}>
      <div className="card-header">
        <div className="card-headding gradient-text ">Category</div>
        {/* <div className="errorMessage">{alertMessage}</div> */}
        <div className="top-button">
          <Link to="/addcategory"> <button className="btn-primary btn-color"> +Add</button></Link>
          <ToastContainer />
        </div>
      </div>
      {/* <div className="content-div"> */}
      <div className="">
        <table className="table-container table">
          <thead>
            <tr className="table-headding">
              {
                tableHeadding.map((eachHeadding, id) =>
                  <td key={id}>{eachHeadding.th}</td>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              categorys.map((category, id) =>
                <tr key={id} scope="row">
                  <td>{category._id}</td>
                  <td>{category.vechicle}</td>
                  <td>{category.partsName}</td>
                  <td>{category.spairPatsType}</td>
                  <td><img src={`http://localhost:5001/${category.image}`} alt="banner" className="bannerImg" /></td>
                  {
                    subCategorys.find(cat => cat.category_id === category._id) !== undefined ? <td>  <i className="bi bi-trash3-fill" id={category._id} onClick={deleteCategory}></i>  </td> : "This added in Subcategory"
                  }
                  <td> 
                    <Link to={`/categoryupdate/${category._id}`}>
                  <i className="bi bi-pencil-square"  ></i>
                  </Link> 
                  </td>


                  {/* <td><i className="bi bi-pencil-square"></i> </td> */}
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}


export const AddCategory = () => {
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
          <div className="card-headding gradient-text ">Add Category</div>
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
    </>
  );
};

export default AddCategory;

