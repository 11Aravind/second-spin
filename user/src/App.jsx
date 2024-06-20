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
function App() {

  return (
    <div>
      <Navbar />
      <Bottomnavbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Routes>

    </div>
  )
}

export default App
