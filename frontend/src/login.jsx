import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

function Login() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setStatus("loading");

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setStatus("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.log(err);
      setStatus("");
      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="store-icon"></div>

          <h2>Community Store</h2>

          <p>Fresh essentials delivered to your door</p>

          <div className="auth-tabs">
            <div className="auth-tab active">
              🔑 Login
            </div>

            <div
              className="auth-tab"
              onClick={() => navigate("/signup")}
            >
              👤 Sign Up
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Welcome back!</h3>

          <p className="sub">
            Login to order your daily essentials
          </p>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleLogin}
            className={`btn ${status}`}
          >
            {status === "loading"
              ? "Logging in..."
              : status === "success"
              ? "Login Successful ✓"
              : "Login →"}
          </button>

          <p className="switch">
            No account?
            <span onClick={() => navigate("/signup")}>
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;