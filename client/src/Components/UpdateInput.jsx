import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Feature/adminFeature";
import useDebouncing from "../Utils/useDebouncing";
import { toast, ToastContainer } from "react-toastify";
import { getAllUsers } from "../Feature/adminFeature";

const UpdateInput = ({ onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    profilePicture: null,
  });

  const { userForUpdate, isUpdated } = useSelector((state) => state.admin);
  const debounce = useDebouncing(updateUser);
  const dipstach = useDispatch();

  useEffect(() => {
    if (userForUpdate) {
      setFormData({
        name: userForUpdate.name || "",
        email: userForUpdate.email || "",
      });
    }
  }, [userForUpdate]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("User updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setTimeout(() => {
        onClose();
        dipstach(getAllUsers());
      }, 2000);
    }
  }, [isUpdated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        return {
          ...prev,
          profilePicture: file,
        };
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formDatas = new FormData();

    formDatas.append("name", formData.name);
    formDatas.append("email", formData.email);

    if (formData.profilePicture) {
      formDatas.append("profilePicture", formData.profilePicture);
    }

    debounce({ id: userForUpdate._id, data: formDatas });

    // setTimeout(() => {

    // }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000">
      <ToastContainer />
      <div>
        <div className="bg-white m-auto p-4 rounded-lg shadow-lg w-2/3 md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold mb-2 text-center ">
              Update User
            </h2>

            <button
              className="cursor-pointer"
              onClick={() => {
                onClose();
                dipstach(getAllUsers());
              }}
            >
              Close
            </button>
          </div>

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2 border-2 rounded-lg"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border-2 rounded-lg"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <input
            className="p-2 w-full mb-2 cursor-pointer border-2 rounded-lg"
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button
            onClick={handleUpdate}
            className="p-2 w-full bg-blue-500 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateInput;
