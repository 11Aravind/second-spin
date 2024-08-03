import axios from "axios"
import { useEffect, useState } from "react"
import CategoeryCard from "../components/CategoeryCard"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Subcategory = () => {
    const { id } = useParams();
    console.log(id);
    const [subCategorys, setSubCategory] = useState([])
    // const category=useSelector(state=>state.categorys.categoryList);
    useEffect(() => {
        axios.get('http://localhost:5001/api/category/subcategory')
            .then((res) => {
                setSubCategory(res.data.payload.filter((item) => item.category_id === id))
                // setSubCategory(res.data.payload)
            })
            .catch((err) => console.log(err))
    }, [])
    console.log(subCategorys);
    return (
        <div className="container space">
            {
                subCategorys.length !== 0 ? <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" >
                    {
                        subCategorys.map((subCat, index) => (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-2" key={index}>
                                <Link to={`/testproduct/${subCat._id}`} className="card-link">
                                <div className="card h-100 category">
                                    <div className="img-container category-img">
                                        <img src={`http://localhost:5001/${subCat.image}`} className="card-img-top product-image" alt="img" />
                                    </div>
                                    <div className="category-name">{subCat.Subcat_name}</div>
                                </div>
                                </Link>
                            </div>
                        ))
                    }
                </div> : <div className="message-container">
                    <h1>204 </h1>
                    <small>Notice - The subcategory and its product was currently not added</small>
                </div>
            }
        </div>
    )
}

export default Subcategory
