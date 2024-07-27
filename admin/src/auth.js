const onCheckOut = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    userId === null && navigate("/login");
    return userId;
  };