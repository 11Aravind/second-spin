import { useEffect, useRef, useState } from "react";
import axios from 'axios'
const AddProduct = () => {
  const prodcutName = useRef('');
  const oldPrice = useRef('');
  const newPrice = useRef('');
  const Description = useRef('');
  const suitedVehicleRef = useRef('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productLabel, setProductLabel] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  const [message, setMessage] = useState("");
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000)
  }
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!prodcutName.current.value) {
      newErrors.prodcutName = "Please enter a product name";
      isValid = false;
    }

    if (!oldPrice.current.value) {
      newErrors.oldPrice = "Please enter an old price";
      isValid = false;
    }

    if (!newPrice.current.value) {
      newErrors.newPrice = "Please enter a new price";
      isValid = false;
    }

    if (!Description.current.value) {
      newErrors.Description = "Please enter a description";
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

    if (productLabel === "") {
      newErrors.productLabel = "Please select a product label";
      isValid = false;
    }

    setErrors(newErrors);
    setTimeout(() => {
      setErrors({
        prodcutName: '',
        oldPrice: '',
        newPrice: '',
        Description: '',
        suitedVehicleRef: '',
        image: '',
        categoryId: '',
        productLabel: '',
      });
    }, 3000);
    return isValid;
  };
  const [errors, setErrors] = useState({
    prodcutName: '',
    oldPrice: '',
    newPrice: '',
    Description: '',
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

  const mergeCategoriesAndSubcategories = (categories, subcategories) => {
    return categories.map(cat => {
      return {
        ...cat,
        subcategories: subcategories.filter(subcat => subcat.category_id === cat._id)
      };
    });
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
  const resetValues = () => {
    prodcutName.current.value = "";
    Description.current.value = "";
    oldPrice.current.value = "";
    newPrice.current.value = "";
    setImage('');
  }
  const saveProduct = () => {
    if (validateForm()) {
      const productDetails = new FormData();
      productDetails.append('name', prodcutName.current.value);
      productDetails.append('image', image);
      productDetails.append('description', Description.current.value);
      productDetails.append('productLabel', productLabel);
      productDetails.append('oldPrice', oldPrice.current.value);
      productDetails.append('newPrice', newPrice.current.value);
      productDetails.append('status', 0);
      productDetails.append('category_id', categoryId.split("_")[0]);
      productDetails.append('subCategory_id', categoryId.split("_")[1]);
      productDetails.append('suitedVechicleName', suitedVehicleRef.current.value);
      axios.post('http://localhost:5001/api/product/save', productDetails)
        .then((response) => {
          showMessage(response.data.message);
          alert(response.data.message)
          console.log(response);
          resetValues();
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="content-div">
      <div className="card-header">
        <div className="card-headding">Add Product </div>
        <div className="errorMessage">{message}</div>
      </div>
      <div className="table-container">
        <div className="row " style={{ padding: "37px" }}>
          <div className="col">
            <label htmlFor="category">Product Name</label>
            <input type="text" id="category" className="form-control" ref={prodcutName} />
            <small style={{ color: "red" }}>{errors.prodcutName}</small>
          </div>
          <div className="col">
            <label htmlFor="maincat">Category</label>
            <select className="form-select" id="maincat" aria-label="Default select example" onClick={(e) => setCategoryId(e.target.value)}>
              <option selected>--Select--</option>
              {
                options.map((category, index) => {
                  return <option value={category.ids} key={index}>{category.text}</option>
                })
              }
            </select>
            <small style={{ color: "red" }}>{errors.categoryId}</small>
          </div>
          <div className="col">
            <label htmlFor="category">Suited Vechicles</label>
            <input type="text" id="category" className="form-control" ref={suitedVehicleRef} />
            <small style={{ color: "red" }}>{errors.suitedVehicleRef}</small>

          </div>
        </div>
        <div className="row" style={{ padding: "16px 37px" }}>

          <div className="col-3">
            <label htmlFor="sub_cat">Image</label>
            <input type="file" className="form-control" id="sub_cat" onChange={(e) => setImage(e.target.files[0])} />
            <small style={{ color: "red" }}>{errors.image}</small>

          </div>
          <div className="col-3">
            <label htmlFor="maincat">Product label</label>
            <select className="form-select" id="maincat" aria-label="Default select example" onClick={(e) => setProductLabel(e.target.value)}>
              <option value="choose_anything" selected>--Select--</option>
              <option value="firstHand" selected>First-hand</option>
              <option value="secondHand" selected>Second-hand</option>
            </select>
            <small style={{ color: "red" }}>{errors.productLabel}</small>

          </div>
          <div className="col-3">
            <label htmlFor="sub_cat">Old Price</label>
            <input type="text" className="form-control" id="sub_cat" ref={oldPrice} />
            <small style={{ color: "red" }}>{errors.oldPrice}</small>

          </div>
          <div className="col-3">
            <label htmlFor="sub_cat">Price</label>
            <input type="text" className="form-control" id="sub_cat" ref={newPrice} />
            <small style={{ color: "red" }}>{errors.newPrice}</small>

          </div>
        </div>
        <div className="row" style={{ padding: "16px 37px" }}>
          <div className=" mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={Description}></textarea>
            <small style={{ color: "red" }}>{errors.Description}</small>

          </div>
        </div>
        <div className="row" style={{ padding: "16px 37px" }}>
          <button className="btn btn-primary" onClick={saveProduct}>Save</button>
        </div>
      </div>

    </div>
  );
}

export default AddProduct;