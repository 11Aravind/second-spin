import { useState,useRef } from 'react';
import {httpRequest} from "../api.js"
const Signup = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const name = useRef("");
  const password = useRef("");
  const confirmpassword = useRef("");
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  // const handleBlur = () => {
  //   setFocusedInput(null);
  // };
const handleSignUp=()=>{
  const pass=password.current.value;
  const confirmpass=confirmpassword.current.value;
  if(pass!==confirmpass)
  {
console.log("confirm and pass wird was not matched");
  }
else{
  const signupData={
    "username":name.current.value,
    "password":pass,
  }
  httpRequest("post","server/user/signup",signupData)
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err));
  console.log(signupData);
}


}
  const renderInput = (type,name, placeholder, reference) => (
    <div className="input-container">
      {focusedInput === name ? <label>{placeholder}</label> : null}
      <input
        type={type}
        name={name}
        ref={reference}
        className="input-element"
        placeholder={focusedInput === name ? '' : placeholder}
        onFocus={() => handleFocus(name)}
        onBlur={()=>setFocusedInput(null)}
      />
    </div>
  );

  return (

    <div className="main-container">
      <div className="left-container">
        <div className="login-img">
          <img src="./images/signup.png" alt="img" />
        </div>
      </div>
      <div className="right-container">
        <h4 className="headding">Signup</h4>
        {renderInput("text",'username', 'Username', name)}
        {renderInput("password",'Password', 'Password', password)}
        {renderInput("password",'Confirm Password', 'Confirm Password', confirmpassword)}
        <button className="flatBtn" onClick={handleSignUp}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;