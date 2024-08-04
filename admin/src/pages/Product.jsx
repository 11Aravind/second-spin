import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { httpRequest } from "../API/api"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import "../components/assct/Table.css"
const Product = () => {
    const tableHeadding = [
        { th: "#id" },
        { th: "Name" },
        { th: "Image" },
        { th: "oldPrice" },
        { th: "newPrice" },
        { th: "Description" },
        { th: "Action" },
    ];
    const [products, setProductList] = useState([]);
    const visibility = useSelector((state) => state.visibility.visibility)
    const deleteProduct = (e) => {
        const product_id = e.target.id;
        const url = `http://localhost:5001/api/product/${product_id}`;
        axios.delete(url)
            .then((res) => {
                console.log(res.data);
                if (res.data.status == "success") {
                    toast.success(res.data.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setProductList(prevDetails => prevDetails.filter(product => product._id !== product_id));
                } else {
                    toast.error(res.data.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            });
    }
    const [orders, setOrders] = useState([])
    useEffect(() => {
        httpRequest('get', "api/product").then((data) => {
            // Check if the fetched data is an object and has 'productDetails' array
            if (data && Array.isArray(data.productDetails)) {
                setProductList(data.productDetails);
            } else {
                console.error("Fetched data does not contain 'productDetails' array:", data);
            }
        }).catch(error => {
            console.log("Error fetching data:", error);
        });
        axios.get('http://localhost:5001/api/order/all')
            .then(res => {
                // console.log(res.data.data);
                setOrders(res.data.data)
            })
    }, []);
    console.log(products);
    console.log(orders);
    return (

        <div className={visibility ? "flat-container" : "content-div"} >
            <div className="card-header">
                <div className="card-headding gradient-text">Product Details</div>
                <ToastContainer />
                <div className="top-button">
                    {
                        <Link to="/addproduct"> <button className="btn-primary btn-color"> +Add</button></Link>
                    }
                </div>
            </div>
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
                        products.map((product, id) =>
                              <tr key={id} scope="row">
                                <td>{id + 1}</td>
                                <td>{product.name}</td>
                                <td> <img src={`http://localhost:5001/${product.image}`} alt="img" style={{ "width": "100px" }} /> </td>
                                <td>{product.oldPrice}</td>
                                <td>{product.newPrice}</td>
                                <td>{product.description}</td>
                                {
                                orders.find(order => order._id === product._id) !== undefined ? <td>  <i className="bi bi-trash3-fill" id={product._id} onClick={e => deleteProduct(e)}></i>  </td> : "This added in Subcategory"
                                }
                                <td> <Link to={`/update/${product._id}`}><i className="bi bi-pencil-square"  ></i></Link> </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Product;