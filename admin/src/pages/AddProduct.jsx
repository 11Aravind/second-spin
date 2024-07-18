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
    // useEffect(() => {
    //     axios.get("http://localhost:5001/api/category/subcategory").then((data) => setSubCategoryList(data.payload));
    //     axios.get("http://localhost:5001/api/category").then((data) => setCategoryList(data.payload)).catch(error => {
    //       console.error("Error fetching data:", error);
    //     });
    //   }, []);
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
    
      // useEffect(() => {
      //   if (categoryList.length && subCategoryList.length) {
      //     const merged = mergeCategoriesAndSubcategories(categoryList, subCategoryList);
      //     setMergedData(merged);
      //   }
      // }, [categoryList, subCategoryList]);
    
      // const mergeCategoriesAndSubcategories = (categories, subcategories) => {
      //   return categories.map(cat => {
      //     return {
      //       ...cat,
      //       subcategories: subcategories.filter(subcat => subcat.category_id === cat._id)
      //     };
      //   });
      // };
    
      // const generateOptions = (data) => {
      //   const options = [];
      //   data.forEach(cat => {
      //     if (cat.subcategories.length > 0) {
      //       cat.subcategories.forEach(subcat => {
      //         options.push({
      //           ids: `${cat._id}_${subcat._id}`,
      //           text: `${cat.vechicle}, ${cat.partsName}, ${cat.spairPatsType}, ${subcat.Subcat_name}`
      //         });
      //       });
      //     } else {
      //       options.push({
      //         id: `${cat._id}`,
      //         text: `${cat.vechicle}, ${cat.partsName}, ${cat.spairPatsType}`
      //       });
      //     }
      //   });
      //   return options;
      // };
    
      // const options = generateOptions(mergedData);

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
    // const resetValues = () => {
    //     prodcutName.current.value = "";
    //     Description.current.value = "";
    //     oldPrice.current.value = "";
    //     newPrice.current.value = "";
    //     setImage('');
    // }
    const saveProduct = () => {
      
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
                // resetValues();
            })
            .catch((err) => console.log(err));
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
                    </div>
                    <div className="col">
                        <label htmlFor="category">Suited Vechicles</label>
                        <input type="text" id="category" className="form-control" ref={suitedVehicleRef} />
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>

                    <div className="col-3">
                        <label htmlFor="sub_cat">Image</label>
                        <input type="file" className="form-control" id="sub_cat" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="maincat">Product label</label>
                        <select className="form-select" id="maincat" aria-label="Default select example" onClick={(e) => setProductLabel(e.target.value)}>
                            <option value="choose_anything" selected>--Select--</option>
                            <option value="firstHand" selected>First-hand</option>
                            <option value="secondHand" selected>Second-hand</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <label htmlFor="sub_cat">Old Price</label>
                        <input type="text" className="form-control" id="sub_cat" ref={oldPrice} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="sub_cat">Price</label>
                        <input type="text" className="form-control" id="sub_cat" ref={newPrice} />
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>
                    <div className=" mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={Description}></textarea>
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