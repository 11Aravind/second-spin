import React, { useState } from "react";
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";
import "./CSS/navbar.css"
import { Link } from "react-router-dom";
let options = [
    {
        name: "",
        titleIcon: <i className="fa fa-paragraph"></i>,
        hideBorder: true,
        content: [
            {
                id: 1,
                name: "BIKES",
                children: [
                    {
                        content: [
                            {
                                id: 3,
                                name: "indoor plants",
                                ["Some property i need on clicking this"]: "value",
                                rout: "/productList",
                            },
                            { id: 4, name: "Flowering Plants", rout: "/productList" },
                            { id: 5, name: "Hanging Plants", rout: "/productList" },
                            { id: 6, name: "Cacti and Succulents", rout: "/productList" },
                            { id: 7, name: "Air Purifying Plants", rout: "/productList" },
                        ],
                    },
                ],
            },
            {
                id: 8,
                name: "CARS",
                children: [
                    {
                        content: [
                            { id: 9, name: "Air Purifying Plants", rout: "/productList" },
                            { name: "FLOWER SEEDS", id: 10, rout: "/productList" },
                            { name: "VEGETABLE SEEDS", id: 11, rout: "/productList" },
                            { name: "MICROGREEN SEEDS", id: 12, rout: "/productList" },
                            { name: "HERB SEEDS", id: 13, rout: "/productList" },
                            { name: "FLOWER BULBS", id: 14, rout: "/productList" },
                            { name: "FRUIT SEEDS", id: 15, rout: "/productList" },
                        ],
                    },
                ],
            },
            {
                id: 16,
                name: "Planters",
                children: [
                    {
                        content: [
                            { name: "PLASTIC PLANTERS", rout: "/productList" },
                            { name: "CERAMIC PLANTERS", rout: "/productList" },
                            { name: "METAL PLANTERS", rout: "/productList" },
                            { name: "HANGING PLANTERS", rout: "/productList" },
                            { name: "PLANT STANDS", rout: "/productList" },
                            { name: "ZURI COLLECTION", rout: "/productList" },
                            { name: "SEEDLING TRAYYS", rout: "/productList" },
                        ],
                    },
                ],
            },
            {
                id: 17,
                name: "Plant care",
                children: [
                    {
                        content: [
                            { name: "POTTING MIX AND FERTILISERS", rout: "/productList" },
                            { name: "PEBBLES", rout: "/productList" },
                            { name: "GARDEN TOOLS", rout: "/productList" },
                            { name: "WATERING CANS AND SPRAYERS", rout: "/productList" },
                            { name: "GARDEN DECOR & ACCESSORIES", rout: "/productList" },
                            { name: "PEST CONTROL", rout: "/productList" },
                        ],
                    },
                ],
            },
            // {
            //   id: 18,
            //   name: "Account",
            //   children: [
            //     {
            //       content: [

            //         { name: "Change Password", rout: "/password" },
            //         user_id == null
            //           ? { name: "Sign In", rout: "/signIn" }
            //           : { name: "Sign Out", rout: "/signOut" },
            //         user_id != null && { name: "Orders", rout: "/orders" },
            //         user_id != null && { name: "Manage Address", rout: "/manageaddress" },
            //       ],
            //     },
            //   ],
            // },
            {
                id: 19,
                name: "FAQ",
                children: [
                    {
                        content: [
                            { name: "Contact US", rout: "/contactus" },
                            { name: "Privacy Policy", rout: "/PrivacyPolicy" },
                            { name: "Terms & Conditions", rout: "/Terms" },
                            { name: "Cancellation & Refund", rout: "/RefundPolicy" },
                            { name: "About US", rout: "/About" },
                        ],
                    },
                ],
            },
        ],
    },
];

const Navbar = () => {
    const [isOpen, handleClick] = useState(false);

    // const handleSidebarToggle = isOpen => {
    //     setIsOpen(isOpen);
    // };

    const menuClicked = itemOptions => {
        /* 
            do something with the item you clicked.
            you can also send custom properties of your choice
            in the options array you'll be getting those here
            whenever you click that item
        */
    };

    return (
        <>
            <MultilevelSidebar
                open={isOpen}
                onToggle={ ()=>handleClick(!isOpen)}
                options={options}
                header="SecondSpin"
                onItemClick={menuClicked}
            />
            <div className="headerDiv">
                <i
                    className="bi bi-justify"
                    onClick={() => handleClick(true)}
                    aria-hidden="true"
                ></i>

                <Link to="/">
                <div className="logo">
                    <img src="./images/logo.png" width="60"
                    />
                </div>
                </Link>
            </div>

        </>
    );
};

export default Navbar;
