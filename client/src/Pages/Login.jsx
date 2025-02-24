import React, { useEffect, useState } from "react";
import { loginUser } from "../Feature/userFeature";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isLoggedin } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        dispatch(loginUser(formData));
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error("login failed");
    }
  };

  return (
    <div className="w-full p-3 sm:w-full md:w-full lg:w-full min-h-screen flex flex-col justify-center items-center bg-cyan-100">
      <ToastContainer />
      {isLoading ? (
        <h1 className="text-2xl mb-3">Loading...</h1>
      ) : (
        <h1 className="text-2xl text-black mb-3">Login</h1>
      )}
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-auto gap-4 p-6 border-2 bg-white shadow-lg rounded-lg"
      >
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          type="submit"
        >
          Login
        </button>
        <a href="/">
          <span className="cursor-pointer p-1 text-cyan-400">New Register</span>
        </a>
      </form>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Login;
