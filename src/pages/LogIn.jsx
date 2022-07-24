import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {useLoginUSerMutation} from "../services/appApi";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../context/appContext";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, {isLoading, isError}] = useLoginUSerMutation();
  const navigate = useNavigate();

  const {socket} = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({email, password}).then(({data}) => {
      if (data) {
        // socket
        //navigate to chat
        socket.emit("new-user");
        navigate("/chat");
      }
    });
  };

  return (
    <div className="login">
      {isError && <p>Error! User Not Found!</p>}

      <div className="text">
        <h1>Login</h1>
        <p>Call your friends around the globe!</p>
      </div>
      <form className="input-con" onSubmit={handleLogin}>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={email}
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          id="password"
        />
        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
        <p>
          Don't have an account yet? <Link to={"/signup"}>Signup</Link>
        </p>
      </form>
      <div className="overlay"></div>
    </div>
  );
};

export default LogIn;
