import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { changeVisibility } from "../Slice/visibilitySlice"
const Navbar = () => {
    const menuData = [
        {
            menu: 'Dashboard',
            url: "/",
            subMenu: {
                menu: 'menu 1',
                url: "/"
            },
        },
        {
            menu: 'Service',
            subMenu: [
                {
                    menu: 'Category',
                    url: "/category"
                },
                {
                    menu: 'Sub category',
                    url: "/subcategory"
                },
                {
                    menu: 'Product',
                    url: "/productdetails"
                },

                {
                    menu: 'Order',
                    url: "/orderdetails"
                },
                // {
                //     menu: 'Blog',
                //     url: "/blogs"
                // },
                // {
                //     menu: 'Gallery',
                //     url: "/gallery"
                // },
            ],
        },
    ];
    // const[navbarShowOrHide,isToogleVisibility]=useState(false);
    // const navbarCallBack=(e)=>{
    //     isToogleVisibility(!navbarShowOrHide);
    //     console.log(navbarShowOrHide);
    // }
    const visibility = useSelector((state) => state.visibility.visibility)

    return (
        <>
            <Topnavbar
            // navbarShowOrHide={navbarShowOrHide} 
            // navbarCallBack={navbarCallBack}
            />
            <div className={visibility ? "content-container show" : "hide"}>
                <div className="side-nav-container" >
                    {menuData.map((menuItem, index) => (
                        <div className="menu-container" key={index}>
                            <div className="main-menu-headding gradient-text">{menuItem.menu}</div>

                            {Array.isArray(menuItem.subMenu) ? (
                                <>
                                    {menuItem.subMenu.map((subMenuItem, subIndex) => (
                                        <Link to={subMenuItem.url} key={subIndex}>
                                            <div className="submenu" key={subIndex}>{subMenuItem.menu}</div>

                                        </Link>))}
                                </>
                            ) : (
                                <Link to={menuItem.subMenu.url}>
                                    <div className="submenu" >{menuItem.subMenu.menu}</div>
                                </Link>

                            )}
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
}
export default Navbar;
// export const Topnavbar = () => {
//     const dispatch = useDispatch();
//     const visibility = useSelector((state) => state.visibility.visibility)
//     useEffect(()=>{

//     },[adminId])
//     return (
//         <div className="topnav-container">

//             <div className="top-leftContainer">
//                 <div className="logo">
//                     <img src="./logo3ai.png" alt="logo" style={{ width: "49px" }} />
//                 </div>
//                 <div className="closingBtn" onClick={() => dispatch(changeVisibility(!visibility))}>
//                     <div className="bar"></div>
//                     <div className="bar"></div>
//                     <div className="bar"></div>
//                 </div>
//             </div>
//             <div className="dropdown">
//                 <button className="dropbtn gradient-text"><b>Admin</b></button>
//                 <div className="dropdown-content" style={{"cursor": "pointer","padding": "16px 7px 6px 5px"}}>
//                     <div className="d-flex"  onClick={()=>localStorage.removeItem('adminId')}><i className="bi bi-power err"></i> Logout</div>
//                 </div>
//             </div>
//         </div>
//     );
// }
export const Topnavbar = () => {
    const dispatch = useDispatch();
    const visibility = useSelector((state) => state.visibility.visibility);
    const navigate = useNavigate(); // For navigation

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        dispatch(changeVisibility(!visibility)); // Toggle visibility to trigger a re-render or update any necessary state
        navigate('/login'); // Redirect to login or any other appropriate route
    };

    return (
        <div className="topnav-container">
            <div className="top-leftContainer">
                <div className="logo">
                    <img src="./logo3ai.png" alt="logo" style={{ width: "49px" }} />
                </div>
                <div className="closingBtn" onClick={() => dispatch(changeVisibility(!visibility))}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn gradient-text"><b>Admin</b></button>
                <div className="dropdown-content" style={{"cursor": "pointer","padding": "16px 7px 6px 5px","marginTop": "2px","paddingLeft": "5px","paddingRight": "12px"}}>
                    <div className="d-flex" onClick={handleLogout}>
                        <i className="bi bi-power err" style={{"marginRight": "5px"}}></i> Logout
                    </div>
                </div>
            </div>
        </div>
    );
}