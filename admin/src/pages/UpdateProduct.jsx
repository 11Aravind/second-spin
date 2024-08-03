import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const UpdateProduct = () => {
  const { productId } = useParams();
  const productNameRef = useRef('');
  const oldPriceRef = useRef('');
  const newPriceRef = useRef('');
  const descriptionRef = useRef('');
  const ex = useRef('');
  const suitedVehicleRef = useRef('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [errors, setErrors] = useState({
    productName: '',
    oldPrice: '',
    newPrice: '',
    description: '',
    suitedVehicleRef: '',
    image: '',
    categoryId: '',
    productLabel: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategoryResponse = await axios.get("http://localhost:5001/api/category/subcategory");
        setSubCategoryList(subCategoryResponse.data.payload);
        const categoryResponse = await axios.get("http://localhost:5001/api/category");
        setCategoryList(categoryResponse.data.payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryList.length && subCategoryList.length) {
      const merged = mergeCategoriesAndSubcategories(categoryList, subCategoryList);
      setMergedData(merged);
    }
  }, [categoryList, subCategoryList]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/product`)
      .then((res) => {
        const product = res.data.productDetails.find((item) => item._id === productId);
        if (product) {
          productNameRef.current.value = product.name || '';
          oldPriceRef.current.value = product.oldPrice || '';
          newPriceRef.current.value = product.newPrice || '';
          descriptionRef.current.value = product.description || '';
          suitedVehicleRef.current.value = product.suitedVechicleName || '';
          ex.current.value = product.productLabel ;
          setImage(product.image || '');
          setProductLabel(product.productLabel || '');
          console.log(product.productLabel);
          
        }
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const mergeCategoriesAndSubcategories = (categories, subcategories) => {
    return categories.map(cat => ({
      ...cat,
      subcategories: subcategories.filter(subcat => subcat.category_id === cat._id)
    }));
  };

  const generateOptions = (data) => {
    const options = [];
    data.forEach(cat => {
      if (cat.subcategories.length > 0) {
        cat.subcategories.forEach(subcat => {
          options.push({
            ids: `${cat._id}_${subcat._id}`,
            text: `${cat.vechicle}, ${cat.partsName}, ${cat.spairPatsType}, ${subcat.Subcat_name}`
          });
        });
      }
    });
    return options;
  };

  const options = generateOptions(mergedData);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!productNameRef.current.value) {
      newErrors.productName = "Please enter a product name";
      isValid = false;
    }

    if (!oldPriceRef.current.value) {
      newErrors.oldPrice = "Please enter an old price";
      isValid = false;
    }

    if (!newPriceRef.current.value) {
      newErrors.newPrice = "Please enter a new price";
      isValid = false;
    }

    if (!descriptionRef.current.value) {
      newErrors.description = "Please enter a description";
      isValid = false;
    }

    if (!suitedVehicleRef.current.value) {
      newErrors.suitedVehicleRef = "Please enter a suited vehicle";
      isValid = false;
    }

    if (!image) {
      newErrors.image = "Please select an image";
      isValid = false;
    }

    if (categoryId === "") {
      newErrors.categoryId = "Please select a category";
      isValid = false;
    }

    if (productLabel === "--Select--") {
      newErrors.productLabel = "Please select a product label";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetValues = () => {
    productNameRef.current.value = "";
    oldPriceRef.current.value = "";
    newPriceRef.current.value = "";
    descriptionRef.current.value = "";
    suitedVehicleRef.current.value = "";
    setImage('');
    setProductLabel('');
  }

  const saveProduct = () => {
    if (validateForm()) {
      const productDetails = new FormData();
      productDetails.append('name', productNameRef.current.value);
      productDetails.append('image', image);
      productDetails.append('description', descriptionRef.current.value);
      productDetails.append('productLabel', productLabel);
      productDetails.append('oldPrice', oldPriceRef.current.value);
      productDetails.append('newPrice', newPriceRef.current.value);
      productDetails.append('status', 0);
      productDetails.append('category_id', categoryId.split("_")[0]);
      productDetails.append('subCategory_id', categoryId.split("_")[1]);
      productDetails.append('suitedVechicleName', suitedVehicleRef.current.value);
      axios.post('http://localhost:5001/api/product/save', productDetails)
        .then((response) => {
          response.data.status === "success" ? toast.success(response.data.message) : toast.error(response.data.message);
          resetValues();
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="content-div">
      <ToastContainer />
      <div className="card-header">
        <div className="card-heading">Update Product</div>
      </div>
      <div className="table-container">
        <div className="row" style={{ padding: "37px" }}>
          <div className="col">
            <label htmlFor="productName">Product Name</label>
            <input type="text" id="productName" className="form-control" ref={productNameRef} />
            <small style={{ color: "red" }}>{errors.productName}</small>
          </div>
          <div className="col">
            <label htmlFor="maincat">Category</label>
            <select className="form-select" id="maincat" aria-label="Default select example" onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">--Select--</option>
              {options.map((category, index) => (
                <option value={category.ids} key={index}>{category.text}</option>
              ))}
            </select>
            <small style={{ color: "red" }}>{errors.categoryId}</small>
          </div>
          <div className="col">
            <label htmlFor="suitedVehicle">Suited Vehicles</label>
            <input type="text" id="suitedVehicle" className="form-control" ref={suitedVehicleRef} />
            <small style={{ color: "red" }}>{errors.suitedVehicleRef}</small>
          </div>
        </div>
        <div className="row" style={{ padding: "16px 37px" }}>
          <div className="col-3">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
            <small style={{ color: "red" }}>{errors.image}</small>
          </div>
          <div className="col-3">
            <label htmlFor="productLabel">Product Label</label>
            <select className="form-select" id="productLabel" aria-label="Default select example" onChange={(e) => setProductLabel(e.target.value)}>
              <option>--Select--</option>
              <option value="firstHand">First-hand</option>
              <option value="secondHand">Second-hand</option>
            </select>
            <h1 ref={ex}></h1>
            <small style={{ color: "red" }}>{errors.productLabel}</small>
          </div>
          <div className="col-3">
            <label htmlFor="oldPrice">Old Price</label>
            <input type="text" className="form-control" id="oldPrice" ref={oldPriceRef} />
            <small style={{ color: "red" }}>{errors.oldPrice}</small>
          </div>
          <div className="col-3">
            <label htmlFor="newPrice">Price</label>
            <input type="text" className="form-control" id="newPrice" ref={newPriceRef} />
            <small style={{ color: "red" }}>{errors.newPrice}</small>
          </div>
        </div>
        <div className="row" style={{ padding: "16px 37px" }}>
          <div className="col">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" rows="4" ref={descriptionRef}></textarea>
            <small style={{ color: "red" }}>{errors.description}</small>
          </div>
        </div>
        <div className="row justify-content-center" style={{ padding: "16px 37px" }}>
          <div className="col-4">
            <button type="button" className="btn btn-success" onClick={saveProduct}>Save Product</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct;
