import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios"
export const Subcategory = () => {
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
        <div className="card-headding gradient-text ">Sub Category Details</div>
        {/* <div className="errorMessage">{alertMessage}</div> */}
        <div className="top-button">
          <Link to="/addsubcategory"> <button className="btn-primary btn-color"> +Add</button></Link>
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



