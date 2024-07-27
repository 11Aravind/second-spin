import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Product from "./pages/Product.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import Order from "./pages/Order.jsx"
import Blogs from "./pages/Blogs"
import Addblog from "./pages/Addblog"
import Gallery from "./pages/Gallery"
import Notfound from "./pages/Notfound"

import {Categorydetails,AddCategory} from "./pages/Categorydetails"
import { Login } from "./pages/Login.jsx"
import { Signup } from "./pages/Signup.jsx"
import { Route, Routes,useLocation } from "react-router-dom"
const routerInfo = [
  { path: "/", component: <Home /> },
  { path: "/productdetails", component: <Product /> },
  { path: "/addproduct", component: <AddProduct /> },
  { path: "/orderdetails", component: <Order /> },
  { path: "/blogs", component: <Blogs /> },
  { path: "/addblog", component: <Addblog /> },
  { path: "/category", component: <Categorydetails /> },
  { path: "/addcategory", component: <AddCategory /> },
  { path: "/gallery", component: <Gallery /> },
  { path: "/login", component: <Login /> },
  { path: "/signup", component: <Signup /> },
  { path: "*", component: <Notfound /> },
];
const App = () => {
  const noCommonComponents = ['/login'];
  const location = useLocation();

  return (
    <div className="nav-container">
         {!noCommonComponents.includes(location.pathname) && (
         <Navbar />
      )}
      <Routes>
      {
        // Iterate over each route information object
        routerInfo.map((eachRoute, id) => {
          // For each route, return a Route component
          return (
            <Route 
              key={id} // Unique key for each Route
              path={eachRoute.path} // URL path for the Route
              element={eachRoute.component} // Component to render for the Route
            />
          );
        })
      }
    </Routes>
    </div>

  );
}

export default App;
