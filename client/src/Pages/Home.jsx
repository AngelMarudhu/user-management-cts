import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../Feature/userFeature";
import { updatePicture } from "../Feature/userFeature";
import useDebouncing from "../Utils/useDebouncing";
import { logOut } from "../Redux/userSlice";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [fileData, setFileData] = useState(null);
  const { user, isLoading, isProfilePictureUpdated } = useSelector(
    (state) => state.user
  );
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debounce = useDebouncing(getUserProfile);
  const debounceUpdate = useDebouncing(updatePicture);

  useEffect(() => {
    debounce();
  }, [dispatch]);

  useEffect(() => {
    if (isProfilePictureUpdated) {
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [isProfilePictureUpdated]);

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileData(file);
      e.target.value = "";
    }
  };

  const uploadPhoto = (e) => {
    e.preventDefault();
    if (!fileData) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePicture", fileData);

    // try {
    debounceUpdate(formData);
    //   toast.success("Updated successfully", {
    //     position: "top-right",
    //     autoClose: 500,
    //   });
    // } catch (error) {
    //   toast.error("Failed to update picture. Please try again.", {
    //     position: "top-right",
    //     autoClose: 1000,
    //   });
    // }
  };
  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Home</h1>

        <article>
          <h3 className="text-lg font-semibold text-left">
            Welcome {user.name}
          </h3>
          <p className="text-gray-600 text-left">Email: {user.email}</p>

          <div
            className="relative inline-block mt-4"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* http://localhost:5001 */}
            {/* https://user-management-cts.onrender.com */}
            <img
              src={`http://localhost:5001${user.profilePicture}`}
              alt={user.name}
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />

            {hover && (
              <>
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-2 right-2 bg-black text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                >
                  <FaPencilAlt size={12} />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </article>
        <div>
          <button
            onClick={uploadPhoto}
            className="border-2 p-1 mt-2 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Upload"}
          </button>

          <button
            onClick={logout}
            className="border-2 p-1 mt-2 cursor-pointer ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
