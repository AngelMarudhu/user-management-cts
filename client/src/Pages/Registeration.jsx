import React, { useState } from "react";
import { registerUser } from "../Feature/userFeature";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Registeration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
    dispatch(registerUser(formDataToSend));

    navigate("/login");

    setFormData({
      name: "",
      email: "",
      password: "",
      profilePicture: null,
    });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-cyan-100">
      <h1 className="text-2xl font-bold mb-6">Registration</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>

        <span
          className="cursor-pointer p-1 mt-2 text-cyan-400"
          onClick={() => navigate("/login")}
        >
          Already Registered
        </span>
      </form>

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Registeration;
