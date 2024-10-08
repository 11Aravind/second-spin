import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
const Orderplaced = () => {
    const { setItems } = useCart();
    const navigate = useNavigate()

    useEffect(() => {
        setItems([]);
        const redirectTimeout = setTimeout(() => {
            navigate("/orders")
        }, 4000); // Adjust the delay (in milliseconds) as needed
    
        // Clean up the timeout on component unmount (optional)
        return () => clearTimeout(redirectTimeout);
      }, [history]);
    return (
        <div className="containerDiv">
            <i className="bi bi-check2-circle" style={{ fontSize: "100px", color: "green" }}></i>
            <h3>PAYMENT SUCCESS</h3>
        </div>
    )
}

export default Orderplaced
