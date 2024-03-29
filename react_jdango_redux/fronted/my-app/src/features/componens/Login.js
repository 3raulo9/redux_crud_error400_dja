import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { doLoginAsync, selectLogged, logout } from "./loginSlice";

const Login = () => {
  const logged = useSelector(selectLogged);
  // const token = useSelector(selectToken);  // Commented out because it's not used
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {logged ? 
        <button onClick={() => dispatch(logout())}>Logout</button> :
        <div>
          User name: <input onChange={(e) => setUsername(e.target.value)}></input>
          Password: <input onChange={(e) => setPassword(e.target.value)}></input>
          <button onClick={() => dispatch(doLoginAsync({username, password}))}>Login</button>
        </div>
      }
    </div>
  );
}

export default Login;
