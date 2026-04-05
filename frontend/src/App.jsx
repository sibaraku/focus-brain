import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// Main app component that toggles between login and sign-up forms
const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <Login switchForm={() => setIsLogin(false)} />
  ) : (
    <SignUp switchForm={() => setIsLogin(true)} />
  );
};

export default App;
