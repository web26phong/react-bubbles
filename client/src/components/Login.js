import React, {useState} from "react";
import Axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUserChanges = e => {
    setUsername(e.target.value);
}

const handlePwChanges = e => {
    setPassword(e.target.value);
}

const handleSubmit = e => {
    e.preventDefault();
    Axios
    .post(`http://localhost:5000/api/login`, {username, password})
    .then(res=> {
      // console.log(res)
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage")
        setMessage("")
    })
    .catch(err=>{
        console.log(err, "failed to login")
        setMessage("Failed to login. Please try again.")
    })
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <input type="text" onChange={handleUserChanges} value={username} placeholder="username"/>
        <input type="password" onChange={handlePwChanges} value={password} placeholder="password" />
        <button onClick={handleSubmit}>Login</button>
        {message !== "" && (<div>{message}</div>)}
      </div>
      
    </>
  );
};

export default Login;
