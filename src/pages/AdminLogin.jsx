import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
"https://nanda-ladies-corner-backend.onrender.com/api/auth/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/admin/dashboard");

    } catch (error) {

      alert("Invalid username or password");

    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🌸
        </div>

        <h1>
          Admin Login
        </h1>

        <p>
          Welcome back! Please login to continue
        </p>


        <form onSubmit={loginHandler}>


          <div className="input-group">

            <span>👤</span>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />

          </div>



          <div className="input-group">

            <span>🔒</span>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

          </div>



          <button type="submit">
            Login
          </button>


        </form>


      </div>

    </div>

  );

}

export default AdminLogin;