import axios from "axios"
import {useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import CategoeryCard  from "../components/CategoeryCard"
import {fetchAndStoreCategory} from "../Slice/categorySlice"
const Parts = () => {
    const dispatch=useDispatch()
    const [categorys, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5001/api/category')
        .then((res) =>  {
            dispatch(fetchAndStoreCategory(res.data.payload));
            // setCategory(res.data.payload.filter((category) => category.spairPatsType =="Parts"))
            setCategory(res.data.payload)
        })
         .catch((err) => console.log(err))
    }, [])
    return (
        <div className="container space">
            <CategoeryCard categorys={categorys}/>
        </div>
    )
}

export default Parts
