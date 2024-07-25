import { useParams } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import {fetchAndStoreCategory} from "../Slice/categorySlice"
import CategoeryCard from "../components/CategoeryCard"
const Category = () => {
    const { cat } = useParams();
    const dispatch = useDispatch()
    const [categorys, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5001/api/category')
            .then((res) => {
                dispatch(fetchAndStoreCategory(res.data.payload));
                setCategory(res.data.payload.filter((category) => category.spairPatsType == cat))
            })
            .catch((err) => console.log(err))
    }, [cat])
    return (
        <div className="container space">
            <CategoeryCard categorys={categorys} />
        </div>
    )
}

export default Category
