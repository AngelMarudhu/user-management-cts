import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebouncing from "../Utils/useDebouncing";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../Feature/adminFeature";
import { FaEdit, FaTrash } from "react-icons/fa";
import { logOut } from "../Redux/userSlice";
import { updateUserId } from "../Redux/adminSlice";

const UpdateInput = lazy(() => import("../Components/UpdateInput"));

// import { toast, } from "react-toastify";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debounce = useDebouncing(getAllUsers);
  const { users } = useSelector((state) => state.admin);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    debounce();
  }, []);

  const handleDelete = (deleteId) => {
    dispatch(deleteUser(deleteId));
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const handleEdit = (user) => {
    setIsPopup(true);
    dispatch(updateUserId(user));
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Page - User List</h1>
      <button
        onClick={handleLogout}
        className=" p-2 border-2 rounded-lg mb-3 bg-black text-white cursor-pointer hover:bg-gray-700"
      >
        Logout
      </button>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="flex flex-col flex-wrap md:flex-row justify-between items-center gap-6 w-full">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-4 w-full h-auto md:w-100 sm:w-100"
            >
              <img
                src={`http://localhost:5001/${user.profilePicture}`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <div className="flex gap-3">
                <FaEdit
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => handleEdit(user)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(user._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isPopup && (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UpdateInput onClose={() => setIsPopup(false)} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Admin;
