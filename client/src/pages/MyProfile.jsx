import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import MyFoodSummary from "../components/others/MyFoodSummary";

const MyProfile = () => {
  const { user, updateUserProfile, setUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    if (!photoURL.trim()) {
      toast.error("Photo URL cannot be empty");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to update your profile information.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      // Firebase profile update
      await updateUserProfile({ displayName, photoURL });
      toast.success("Firebase profile updated");

      // Local state update
      setUser({ ...user, displayName, photoURL });

      // Axios DB update
      const response = await axios.put(
        `http://localhost:3000/users/${user.uid}`,
        {
          uid: user.uid,
          name: displayName,
          email: user.email,
          photoURL,
        }
      );

      if (response.status === 200) {
        toast.success("Database updated successfully");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-10 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          My Profile
        </h2>
        <div className="flex justify-center">
          <img
            src={photoURL}
            alt="Profile"
            loading="lazy"
            className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
          />
        </div>

        <h3 className="mt-4 font-bold text-lg">{displayName}</h3>
        <p className="text-gray-600">Email: {user.email}</p>

        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          // className="w-full mt-4 p-2 rounded"
          className="w-full mt-4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          placeholder="Enter your display name"
        />

        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full mt-4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          placeholder="Enter your photo URL"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white py-2 mt-4 rounded transition`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
      <MyFoodSummary />
    </div>
  );
};

export default MyProfile;
