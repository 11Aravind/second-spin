import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes } from "react-router-dom"
import Products from './pages/Products'
import ProductDetails from "./pages/ProductDetails"
import Cart from"./pages/Cart"
import Bottomnavbar from './components/Bottomnavbar'
function App() {

  return (
    <div>
      <Navbar />
      <Bottomnavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Routes>

    </div>
  )
}

export default App
