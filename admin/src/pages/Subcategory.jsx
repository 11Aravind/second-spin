// import { useEffect, useRef, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux"
// import axios from "axios"
// export const Subcategory = () => {
//   const [categorys, setCategoryDetails] = useState([]);
//   const [subCategorys, setSubCategoryList] = useState([]);
//   console.log(subCategorys);
  
//   const [products, setProducts] = useState([]);
//   const visibility = useSelector((state) => state.visibility.visibility)
//   const deleteCategory = (e) => {
//     const category_id = e.target.id;
//     const url = `http://localhost:5001/api/category/${category_id}`;
//     axios.delete(url)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.status == "success") {
//           toast.success(res.data.message, {
//             position: 'top-right',
//             autoClose: 3000,
//           });
//           setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
//         }
//         else {
//           toast.error(res.data.message, {
//             position: 'top-right',
//             autoClose: 3000,
//           });
//         }
//       });
//   }
//   useEffect(() => {
//     axios.get("http://localhost:5001/api/category/subcategory").then(res => setSubCategoryList(res.data.payload))
//       .catch(err => console.log(err))
//     axios.get("http://localhost:5001/api/product").then(res =>{ setProducts(res.data.productDetails)})
//       .catch(err => console.log(err))

//     axios.get("http://localhost:5001/api/category").then((res) => {
//       setCategoryDetails(res.data.payload);
//     }).catch(error => {
//       console.error("Error fetching data:", error);
//     });
//   }, []);
//   const tableHeadding = [{ th: "#id" }, { th: "Subcat_name" },{ th: "image" }, { th: "Action" },];
//   return (
//     <div className={visibility ? "flat-container" : "content-div"}>
//       <div className="card-header">
//         <div className="card-headding gradient-text ">Sub Category Details</div>
//         {/* <div className="errorMessage">{alertMessage}</div> */}
//         <div className="top-button">
//           <Link to="/addsubcategory"> <button className="btn-primary btn-color"> +Add</button></Link>
//           <ToastContainer />
//         </div>
//       </div>
//       {/* <div className="content-div"> */}
//       <div className="">
//         <table className="table-container table">
//           <thead>
//             <tr className="table-headding">
//               {
//                 tableHeadding.map((eachHeadding, id) =>
//                   <td key={id}>{eachHeadding.th}</td>
//                 )
//               }
//             </tr>
//           </thead>
//           <tbody>
//             {
//               subCategorys.map((subCategory, id) =>
//                 <tr key={id} scope="row">
//                   <td>{id+1}</td>
//                   <td>{subCategory.Subcat_name}</td>
//                   <td><img src={`http://localhost:5001/${subCategory.image}`} alt="banner" className="bannerImg" /></td>
//                   {
//                     products.find(item => item.subCategory_id === subCategory._id) !== undefined ? <td>  <i className="bi bi-trash3-fill" id={subCategory._id} onClick={deleteCategory}></i>  </td> : "This added in Product"
//                   }
//                   <td> 
//                     <Link to={`/subcatupdate/${subCategory._id}`}>
//                   <i className="bi bi-pencil-square"  ></i>
//                   </Link> 
//                   </td>
//                   {/* <td><i className="bi bi-pencil-square"></i> </td> */}
//                 </tr>
//               )
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const Subcategory = () => {
  const [categorys, setCategoryDetails] = useState([]);
  const [subCategorys, setSubCategoryList] = useState([]);
  const [products, setProducts] = useState([]);
  const visibility = useSelector((state) => state.visibility.visibility);

  // const deleteCategory = (e) => {
  //   const subcat_id = e.target.id;
  //   const url = `http://localhost:5001/api/category/subcat/${subcat_id}`;
  //   axios.delete(url)
  //     .then((res) => {
  //       if (res.data.status === "success") {
  //         toast.success(res.data.message, {
  //           position: 'top-right',
  //           autoClose: 3000,
  //         });
  //         setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== subcat_id));
  //       } else {
  //         toast.error(res.data.message, {
  //           position: 'top-right',
  //           autoClose: 3000,
  //         });
  //       }
  //     });
  // }

  const deleteCategory = (e) => {
    const subcat_id = e.target.id;
    const url = `http://localhost:5001/api/category/subcat/${subcat_id}`;
    axios.delete(url)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message, {
            position: 'top-right',
            autoClose: 3000,
          });
          setSubCategoryList(prevList => prevList.filter(subCategory => subCategory._id !== subcat_id));
        } else {
          toast.error(res.data.message, {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting subcategory:", error);
        toast.error("Failed to delete subcategory.", {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };
  
  useEffect(() => {
    axios.get("http://localhost:5001/api/category/subcategory")
      .then(res => setSubCategoryList(res.data.payload))
      .catch(err => console.log(err));

    axios.get("http://localhost:5001/api/product")
      .then(res => setProducts(res.data.productDetails))
      .catch(err => console.log(err));

    axios.get("http://localhost:5001/api/category")
      .then((res) => setCategoryDetails(res.data.payload))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const tableHeadding = [
    { th: "#id" },
    { th: "Subcat_name" },
    { th: "image" },
    { th: "Action" }
  ];

  return (
    <div className={visibility ? "flat-container" : "content-div"}>
      <div className="card-header">
        <div className="card-headding gradient-text ">Sub Category Details</div>
        <div className="top-button">
          <Link to="/addsubcategory">
            <button className="btn-primary btn-color">+Add</button>
          </Link>
          <ToastContainer />
        </div>
      </div>
      <div className="">
        <table className="table-container table">
          <thead>
            <tr className="table-headding">
              {tableHeadding.map((eachHeadding, id) =>
                <th key={id}>{eachHeadding.th}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {subCategorys.map((subCategory, id) => (
              <tr key={id} scope="row">
                <td>{id + 1}</td>
                <td>{subCategory.Subcat_name}</td>
                <td>
                  <img
                    src={`http://localhost:5001/${subCategory.image}`}
                    alt="banner"
                    className="bannerImg"
                  />
                </td>
                <td>
                  {products.find(item => item.subCategory_id === subCategory._id) !== undefined ? (
                    "This added in Product"
                  ) : (
                    <i
                      className="bi bi-trash3-fill"
                      id={subCategory._id}
                      onClick={deleteCategory}
                    ></i>
                  )}
                </td>
                <td>
                  <Link to={`/subcatupdate/${subCategory._id}`}>
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
