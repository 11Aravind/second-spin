import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from "react-router-dom"
import Products from './pages/Products'
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
function App() {

  return (
    <div>
      <Topnavbar/>
      <Navbar />
      <Bottomnavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderplaced" element={<Orderplaced />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Notfound />} />

      </Routes>

    </div>
  )
}

export default App
