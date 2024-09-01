// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import { httpRequest } from "../API/api"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import axios from "axios"
// import "../components/assct/Table.css"
// const Product = () => {
//     const tableHeadding = [
//         { th: "#id" },
//         { th: "Name" },
//         { th: "Image" },
//         { th: "oldPrice" },
//         { th: "newPrice" },
//         { th: "Description" },
//         { th: "Action" },
//     ];
//     const [products, setProductList] = useState([]);
//     const visibility = useSelector((state) => state.visibility.visibility)
//     const deleteProduct = (e) => {
//         const product_id = e.target.id;
//         const url = `http://localhost:5001/api/product/${product_id}`;
//         axios.delete(url)
//             .then((res) => {
//                 console.log(res.data);
//                 if (res.data.status == "success") {
//                     toast.success(res.data.message, {
//                         position: 'top-right',
//                         autoClose: 3000,
//                     });
//                     setProductList(prevDetails => prevDetails.filter(product => product._id !== product_id));
//                 } else {
//                     toast.error(res.data.message, {
//                         position: 'top-right',
//                         autoClose: 3000,
//                     });
//                 }
//             });
//     }
//     const [orders, setOrders] = useState([])
//     useEffect(() => {
//         httpRequest('get', "api/product").then((data) => {
//             // Check if the fetched data is an object and has 'productDetails' array
//             if (data && Array.isArray(data.productDetails)) {
//                 setProductList(data.productDetails);
//             } else {
//                 console.error("Fetched data does not contain 'productDetails' array:", data);
//             }
//         }).catch(error => {
//             console.log("Error fetching data:", error);
//         });
//         axios.get('http://localhost:5001/api/order/all')
//             .then(res => {
//                 console.log(res.data.data);
//                 setOrders(res.data.data)
//             })
//     }, []);
//     // console.log(products);
//     // console.log(orders);
//     return (

//         <div className={visibility ? "flat-container" : "content-div"} >
//             <div className="card-header">
//                 <div className="card-headding gradient-text">Product Details</div>
//                 <ToastContainer />
//                 <div className="top-button">
//                     {
//                         <Link to="/addproduct"> <button className="btn-primary btn-color"> +Add</button></Link>
//                     }
//                 </div>
//             </div>
//             <table className="table-container table">
//                 <thead>
//                     <tr className="table-headding">
//                         {
//                             tableHeadding.map((eachHeadding, id) =>
//                                 <td key={id}>{eachHeadding.th}</td>
//                             )
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {/* {
//                         products.map((product, id) =>
//                               <tr key={id} scope="row">
//                                 <td>{id + 1}</td>
//                                 <td>{product.name}</td>
//                                 <td> <img src={`http://localhost:5001/${product.image}`} alt="img" style={{ "width": "100px" }} /> </td>
//                                 <td>{product.oldPrice}</td>
//                                 <td>{product.newPrice}</td>
//                                 <td>{product.description}</td>
//                                 {
//                                 orders.find(order => order.name === product.name) !== undefined ? <td>  <i className="bi bi-trash3-fill" id={product._id} onClick={e => deleteProduct(e)}></i>  </td> : "This added in order"
//                                 }
//                                 <td> <Link to={`/update/${product._id}`}><i className="bi bi-pencil-square"  ></i></Link> </td>
//                             </tr>
//                         )
//                     } */}
//                     {
//   products.map((product, id) => {
//     // Check if the product is included in any order
//     const isProductInOrder = orders.some(order =>
//       order.items.some(item => item.name === product.name)
//     );

//     return (
//       <tr key={id} scope="row">
//         <td>{id + 1}</td>
//         <td>{product.name}</td>
//         <td>
//           <img src={`http://localhost:5001/${product.image}`} alt="img" style={{ width: "100px" }} />
//         </td>
//         <td>{product.oldPrice}</td>
//         <td>{product.newPrice}</td>
//         <td>{product.description}</td>
//         {
//           !isProductInOrder
//             ? <td><i className="bi bi-trash3-fill" id={product._id} onClick={e => deleteProduct(e)}></i></td>
//             : <td>This added in order</td>
//         }
//         <td>
//           <Link to={`/update/${product._id}`}>
//             <i className="bi bi-pencil-square"></i>
//           </Link>
//         </td>
//       </tr>
//     );
//   })
// }

//                 </tbody>
//             </table>
//         </div>
//     );
// }
// export default Product;
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpRequest } from "../API/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../components/assct/Table.css";

const Product = () => {
    const [products, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [first, setFirst] = useState(0);
    const [expandedRows, setExpandedRows] = useState({});
    const visibility = useSelector((state) => state.visibility.visibility);

    const deleteProduct = (e) => {
        const product_id = e.target.id;
        const url = `http://localhost:5001/api/product/${product_id}`;
        axios.delete(url)
            .then((res) => {
                if (res.data.status === "success") {
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
    };

    useEffect(() => {
        httpRequest('get', "api/product").then((data) => {
            if (data && Array.isArray(data.productDetails)) {
                setProductList(data.productDetails);
                setFilteredProducts(data.productDetails);
            } else {
                console.error("Fetched data does not contain 'productDetails' array:", data);
            }
        }).catch(error => {
            console.log("Error fetching data:", error);
        });

        axios.get('http://localhost:5001/api/order/all')
            .then(res => {
                setOrders(res.data.data);
            });
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                    String(product.oldPrice).includes(globalFilter) ||
                    String(product.newPrice).includes(globalFilter)
                )
            );
        };

        filterProducts();
        setFirst(0); // Reset to the first page whenever the filter changes
    }, [globalFilter, products]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRowsPerPage(event.rows);
    };

    const handleExpandToggle = (rowData) => {
        const newExpandedRows = { ...expandedRows };
        newExpandedRows[rowData._id] = !newExpandedRows[rowData._id];
        setExpandedRows(newExpandedRows);
    };

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Search by Name, Old Price, or New Price..." 
                />
            </span>
            <Dropdown 
                value={rowsPerPage} 
                options={[5, 10, 15].map(val => ({ label: val, value: val }))}
                onChange={(e) => {
                    setRowsPerPage(e.value);
                    setFirst(0); // Reset to the first page whenever rows per page change
                }}
                placeholder="Rows per page"
                style={{ marginLeft: '10px' }}
            />
        </div>
    );

    const descriptionBody = (rowData) => {
        const isExpanded = expandedRows[rowData._id];
        const description = isExpanded ? rowData.description : `${rowData.description.substring(0, 50)}...`;
        return (
            <div>
                {description}
                <span 
                    style={{ color: 'blue', cursor: 'pointer' }} 
                    onClick={() => handleExpandToggle(rowData)}
                >
                    {isExpanded ? ' less' : ' more'}
                </span>
            </div>
        );
    };

    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <div className="card-header">
                <div className="card-headding gradient-text">Product Details</div>
                <ToastContainer />
                <div className="top-button">
                    <Link to="/addproduct"> 
                        <button className="btn-primary btn-color"> +Add</button>
                    </Link>
                </div>
            </div>

            {/* <DataTable 
                value={filteredProducts.slice(first, first + rowsPerPage)} 
                paginator 
                rows={rowsPerPage} 
                header={header} 
                totalRecords={filteredProducts.length} 
                onPage={onPageChange}
                className="table-container"
                rowHover
            > */}
             <DataTable 
          value={products} 
          paginator 
          rows={rowsPerPage} 
        //   rowsPerPageOptions={[5, 10, 15]} 
          globalFilter={globalFilter} 
          header={header} 
          responsiveLayout="scroll"
        >
                <Column header="SL No" body={(rowData, { rowIndex }) => first + rowIndex + 1} />
                <Column field="name" header="Name" sortable/>
                <Column header="Image" body={(rowData) => (
                    <img src={`http://localhost:5001/${rowData.image}`} alt="img" style={{ width: "100px" }} />
                )} />
                <Column field="oldPrice" header="Old Price" sortable/>
                <Column field="newPrice" header="New Price" sortable/>
                <Column header="Description" body={descriptionBody} sortable />
                <Column body={(rowData) => {
                    const isProductInOrder = orders.some(order =>
                        order.items.some(item => item.name === rowData.name)
                    );
                    return !isProductInOrder
                        ? <i className="bi bi-trash3-fill" id={rowData._id} onClick={e => deleteProduct(e)}></i>
                        : "This added in order";
                }} header="Action" />
                <Column body={(rowData) => (
                    <Link to={`/update/${rowData._id}`}>
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                )} header="Edit" />
            </DataTable>
        </div>
    );
};

export default Product;
