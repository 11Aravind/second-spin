import './App.css'
import {httpRequest} from "./api"
import { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux"
import {fetchAndStoreCategory} from "./Slice/categorySlice"
import {fetchAndStore} from "./Slice/productSlice"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes,useLocation } from "react-router-dom"
import Products from './pages/Products'
import Product from './pages/Product'
import Category from "./pages/Category"
import ProductDetails from "./pages/ProductDetails"
import Cart from"./pages/Cart"
import Bottomnavbar from './components/Bottomnavbar'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Topnavbar from './components/Topnavbar'
import Notfound from './pages/Notfound'
import { Checkout } from './pages/Checkout'
import Orderplaced from './pages/Orderplaced'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Subcategory from './pages/Subcategory'
import Invoice from './pages/Invoice'

function App() {
  const dispatch=useDispatch();
  const noCommonComponents = ['/login', '/signup','/invoice'];
  const location = useLocation();
  useEffect(() => {
    // Fetching categories
    httpRequest('get', 'api/category')
    .then(data => {
      if (data && Array.isArray(data.payload)) {
        dispatch(fetchAndStoreCategory(data.payload));
      } else {
        console.error("Fetched data does not contain 'payload' array:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
  
    // Fetching products
    httpRequest('get', 'api/product')
      .then(data => {
        if (data && Array.isArray(data.productDetails)) {
          dispatch(fetchAndStore(data.productDetails));
        } else {
          console.error("Fetched data does not contain 'productDetails' array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);
  // const categories=useSelector(state=>state.categorys.categoryList);

  return (
    <div>
       {!noCommonComponents.includes(location.pathname) && (
        <>
          <Topnavbar />
          <Navbar />
          <Bottomnavbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Products />} />
        <Route path="/testproduct/:id" element={<Product />} />
        <Route exact path="/category/:cat" element={<Category/>} />
        {/* <Route path="/parts" element={<Parts />} />
        <Route path="/wheels" element={<Wheels />} /> */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderplaced" element={<Orderplaced />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/subcategory/:id" element={<Subcategory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="*" element={<Notfound />} />
      </Routes>

    </div>
  )
}

export default App
