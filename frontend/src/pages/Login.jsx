import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = currentState === "Sign Up" ? "register" : "login";
      const payload = currentState === "Sign Up" ? { name, email, password } : { email, password };

      const response = await axios.post(`${backendUrl}/api/user/${endpoint}`, payload);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleForgotPassword = () => {
    // Open Telegram link when Forgot Password is clicked
    window.open("https://t.me/heyvick7", "_blank");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-animated">
      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 flex flex-col items-center w-[90%] sm:max-w-[420px] bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg text-gray-800 dark:text-gray-200 transition-all"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <p className="font-bold text-3xl">{currentState}</p>
          <hr className="border-none h-[2px] w-8 bg-gray-800 dark:bg-gray-200" />
        </div>

        {currentState === "Login" ? null : (
          <div className="relative w-full mt-4">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-3 pl-10 border border-gray-800 dark:border-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
              placeholder="Full Name"
              required
            />
            <FaUser className="absolute left-3 top-4 text-gray-500 dark:text-gray-400" />
          </div>
        )}

        <div className="relative w-full mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-3 pl-10 border border-gray-800 dark:border-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
            placeholder="Email"
            required
          />
          <FaUser className="absolute left-3 top-4 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="relative w-full mt-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-3 pl-10 border border-gray-800 dark:border-gray-400 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all"
            placeholder="Password"
            required
          />
          <FaLock className="absolute left-3 top-4 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="w-full flex justify-between text-sm mt-2 text-gray-600 dark:text-gray-400">
          <p
            onClick={handleForgotPassword} // Link for Forgot Password
            className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all"
          >
            Forgot Password?
          </p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            >
              Login Here
            </p>
          )}
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 mt-6 rounded-lg shadow-md transition-all">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
