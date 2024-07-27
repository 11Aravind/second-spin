import { Categorydetails, AddCategory } from "./pages/Categorydetails"
import { Route, Routes, useLocation } from "react-router-dom"
import AddProduct from "./pages/AddProduct.jsx"
import { Signup } from "./pages/Signup.jsx"
import Product from "./pages/Product.jsx"
import { Login } from "./pages/Login.jsx"
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

import Order from "./pages/Order.jsx"
import Addblog from "./pages/Addblog"
import Gallery from "./pages/Gallery"
import Notfound from "./pages/Notfound"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import auth from "./auth.js"
import { useEffect } from "react"
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
// const PrivateRoute = ({ children }) => {
//   const userId = auth.onCheckOut();
//   const navigate=useNavigate();
//   if (!userId) {
//     return navigate("/login");
//   }

//   return children;
// }; 
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const userId = auth.onCheckOut();
  if (!userId) {
    return  navigate("/login");
  }
  return children;
};
const App = () => {
  const noCommonComponents = ['/login'];
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.onCheckOut()) {
      return  navigate("/login");
    }
  },[])

  return (

  //   <div className="nav-container">
  //   {!noCommonComponents.includes(location.pathname) && <Navbar />}
  //   <Routes>
  //     {routerInfo.map((eachRoute, id) => {
  //       if (eachRoute.path !== '/login') {
  //         return (
  //           <Route
  //             key={id}
  //             path={eachRoute.path}
  //             element={
  //               <PrivateRoute>
  //                 {eachRoute.component}
  //               </PrivateRoute>
  //             }
  //           />
  //         );
  //       }

  //       return (
  //         <Route key={id} path={eachRoute.path} element={eachRoute.component} />
  //       );
  //     })}
  //   </Routes>
  // </div>
  <div className="nav-container">
  {!noCommonComponents.includes(location.pathname) && <Navbar />}
  <Routes>
    {routerInfo.map((eachRoute, id) => {
      if (noCommonComponents.includes(eachRoute.path)) {
        return (
          <Route key={id} path={eachRoute.path} element={eachRoute.component} />
        );
      }

      return (
        <Route
          key={id}
          path={eachRoute.path}
          element={
            <PrivateRoute>
              {eachRoute.component}
            </PrivateRoute>
          }
        />
      );
    })}
  </Routes>
</div>
  );
}

export default App;
    // <div className="nav-container">
    //   {!noCommonComponents.includes(location.pathname) && (
    //     <Navbar />
    //   )}
    //   <Routes>
    //     {
    //       routerInfo.map((eachRoute, id) => {
    //         return (
    //           <Route key={id} path={eachRoute.path} element={eachRoute.component}
    //           />
    //         );
    //       })
    //     }
    //   </Routes>
    // </div>