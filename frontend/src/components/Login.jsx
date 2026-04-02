import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { loginUser } from "../api";

const Login = ({ switchForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login-page">    
    <div className="login-container">
      <h2 className="form-title">Log In</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="Email address"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>

      <p className="signup-prompt">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            switchForm();
          }}
        >
          Sign up
        </a>
      </p>
    </div>
    </div>
  );
};


export default Login;