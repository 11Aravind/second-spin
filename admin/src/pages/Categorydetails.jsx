import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../API/api"
import { useSelector } from "react-redux"
export const Categorydetails = () => {
    const [categorys, setCategoryDetails] = useState([]);
    const visibility = useSelector((state) => state.visibility.visibility)
    const deleteCategory = (e) => {
        const category_id = e.target.id;
        const url = `api/category/${category_id}`;
        httpRequest('delete', url)
            .then((data) => {
                setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
            });
    }
    useEffect(() => {
        httpRequest('get', "api/category").then((data) => {
            // Check if the fetched data is an object and has 'categoryDetails' array
            if (data && Array.isArray(data.categoryDetails)) {
                setCategoryDetails(data.categoryDetails);
            } else {
                console.error("Fetched data does not contain 'categoryDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    const tableHeadding = [{ th: "#id" }, { th: "Main category" }, { th: "Category" }, { th: "subCategory" }, { th: "image" }, { th: "Action" },];
    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <div className="card-header">
                <div className="card-headding">Category</div>
                {/* <div className="errorMessage">{alertMessage}</div> */}
                <div className="top-button">
                    <Link to="/addcategory"> <button className="btn-primary"> +Add</button></Link>
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
                                    <td>{category.vehicleType}</td>
                                    <td>{category.category}</td>
                                    <td>{category.subCategory}</td>
                                    <td><img src={`http://localhost:5001/${category.image}`} alt="banner" className="bannerImg" /></td>
                                    <td>  <i className="bi bi-trash3-fill" id={category._id} onClick={deleteCategory}></i>  </td>
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
// export default Categorydetails;
export const AddCategory = () => {
    const vehicleType = useRef('');
    const year = useRef('');
    const model = useRef('');
    const company = useRef('');
    const [message, setMessage] = useState("");
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }
    const resetValue = () => {
        vehicleType.current.value = "";
        year.current.value = "";
        company.current.value = "";
        model.current.value = "";
        model.current.value = "";
    }
    const saveCategory = (e) => {
        const categoryData = {
            "vechicleType": vehicleType.current.value,
            "year": year.current.value,
            "company": company.current.value,
            "model": model.current.value,
        }
        console.log(categoryData);
        httpRequest('post', 'api/category/save', categoryData)
            .then((data) => {
                resetValue();
                showMessage(data.message);
            })
            .catch((error) => console.log(error));
    }
    return (
        <>
            <div className="content-div">
                <div className="card-header">
                    <div className="card-headding">Add Category</div>
                    <div className="errorMessage">{message}</div>
                </div>
                <div className="table-container">
                    <div className="row " style={{ padding: "37px" }}>
                        <div className="col">
                            <label htmlFor="maincat">Vehicle type</label>
                            <select className="form-select" id="maincat" ref={vehicleType} aria-label="Default select example">
                                <option defaultValue="Select" selected>--Select--</option>
                                <option value="Pet">Car</option>
                                <option value="Food">Bike</option>
                                <option value="Accessorys">Truck</option>
                                <option value="Medicine">Plain</option>
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="category">Year</label>
                            <input type="text" id="category" ref={year} className="form-control" />
                        </div>
                        <div className="col">
                            <label htmlFor="category">Company</label>
                            <input type="text" id="category" ref={company} className="form-control" />
                        </div>
                        <div className="col">
                            <label htmlFor="category">Model</label>
                            <input type="text" id="category" ref={model} className="form-control" />
                        </div>
                    </div>
                    {/* <div className="row" style={{ padding: "16px 37px" }}>
                    <div className="col">
                        <label htmlFor="sub_cat">Sub category</label>
                        <input type="text" ref={subcategory} className="form-control" id="sub_cat" />
                    </div>
                    <div className="col">
                        <label htmlFor="image">Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="image" />
                        <small style={{color:"red"}}>{image===""?"Please select an image":""}</small>
                    </div>
                </div> */}

                    <div className="row" style={{ padding: "16px 37px" }}>
                        <button className="btn btn-primary" onClick={saveCategory}>Save</button>
                    </div>
                </div>
            </div>
            <Subcategory />

        </>
    )
}



export const Subcategory = () => {
    const Subcat_name = useRef("")
    const [image, setImage] = useState("")
    const category_id = useRef("")
    const spairPatsType = useRef("")
    const [categorys,setCaregory]=useState([])
    useEffect(() => {
        httpRequest('get', 'api/category/')
            .then((res) => {
                console.log(res)
                setCaregory(res.payload)
            })
            .catch((err) => console.log(err))

    }, [])
    const saveSubcategory = () => {
        if (image === "") {
            alert("Select any image for sub category")
        }
        else {
            const data = new FormData();
            data.append("Subcat_name", Subcat_name.current.value);
            data.append("image", image);
            data.append("category_id", category_id.current.value);
            data.append("spairPatsType", spairPatsType.current.value);
            console.log(data);
            httpRequest("post", "category/subcategory/store", data)
                .then((res) => alert(res.message))
                .catch((err) => console.log(`failed ${err}`));
        }
    }
    return (
        <div className="content-div" style={{ "top": "57%" }}>
            <div className="card-header">
                <div className="card-headding">Add Subcategory</div>
                {/* <div className="errorMessage">{message}</div> */}
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="category">Subcategory name</label>
                        <input type="text" id="category" ref={Subcat_name} className="form-control" />
                    </div>
                    <div className="col">
                        <label htmlFor="category">Image</label>
                        <input type="file" id="category" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                    </div>
                    <div className="col">
                        <label htmlFor="maincat">Main category</label>
                        <select className="form-select" id="maincat" aria-label="Default select example" ref={category_id}>
                            <option defaultValue="Select" selected>--Select--</option>
                            {categorys.map((category, id) => {
                                return (
                                    <option key={id} value={category._id}>{category.vechicleType},{category.company},{category.model},{category.year}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="maincat">Spairparts Type</label>
                        <select className="form-select" id="maincat" aria-label="Default select example" ref={spairPatsType}>
                            <option defaultValue="Select" selected>--Select--</option>
                            <option value="Parts">Parts</option>
                            <option value="Wheels">Wheels</option>
                            <option value="Exterior">Exterior</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Body Parts">Body Parts</option>
                            <option value="Interior">Interior</option>
                            <option value="Audio & Electronics">Audio & Electronics</option>
                            <option value="Automotive Tools">Automotive Tools </option>
                            <option value="Specialty">Specialty </option>
                        </select>
                    </div>



                </div>

                <div className="row" style={{ padding: "16px 37px" }}>
                    <button className="btn btn-primary" onClick={saveSubcategory} >Save</button>
                </div>
            </div>

        </div>
    )
}