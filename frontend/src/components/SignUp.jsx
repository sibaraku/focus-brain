import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { registerUser, loginUser } from "../api";

const SignUp = ({ switchForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const regData = await registerUser(email, password, nickname);
      console.log("Register response:", regData);

      if (regData.message) {
        const loginData = await loginUser(email, password);
        console.log("Auto login response:", loginData);

        if (loginData.token) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("nickname", loginData.nickname);
          navigate("/dashboard");
        } else {
          alert("Registration successful, but auto-login failed");
          switchForm();
        }
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="form-title">Sign Up</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Nickname"
            icon=""
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
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
          <InputField
            type="password"
            placeholder="Confirm password"
            icon="lock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>

        <p className="signup-prompt">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchForm();
            }}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
