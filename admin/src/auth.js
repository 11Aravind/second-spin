// import { useNavigate } from "react-router-dom";
// const onCheckOut = () => {
//   const navigate=useNavigate();
//   const userId = JSON.parse(localStorage.getItem("userId"));
//   userId === null && navigate("/login");
//   return userId;
// };

// export default { onCheckOut };
const auth = {
  onCheckOut: () => {
    const adminId = JSON.parse(localStorage.getItem("adminId"));
    return adminId;
  },
};

export default auth;