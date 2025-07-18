import React, { useEffect, useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import { FaTags, FaInfoCircle, FaBoxes, FaCalendarAlt } from "react-icons/fa";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import NoteList from "../components/details/NoteList";
import CountdownTimer from "../components/details/CountdownTimer";
import NoteInput from "../components/details/NoteInput";
import { useTheme } from "../hooks/ThemeContext";
import relativeTime from "dayjs/plugin/relativeTime";
import { handleDeleteItem } from "../utils/DeleteItem";
import api from "../api/api";

dayjs.extend(relativeTime);

const Details = () => {
  const singleFood = useLoaderData();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { theme } = useTheme();

  const isOwner = user?.email === singleFood.userEmail;
  const isDark = theme === "dark";

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes", {
        params: { foodId: singleFood._id },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [singleFood._id]);

  const baseCard = `rounded-lg shadow p-4 ${
    isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`;

  const headingStyle = `text-2xl font-bold mb-2 ${
    isDark ? "text-green-300" : "text-[#1B5E20]"
  }`;

  return (
    <div
      className={`grid grid-cols-12 gap-4 p-4 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >
      {/* Left Side */}
      <div className="col-span-12 md:col-span-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={baseCard}
        >
          <div className="flex justify-between items-start">
            <h2 className={headingStyle}>{singleFood.title}</h2>
            {singleFood.status === "expired" && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                Expired
              </span>
            )}
            {singleFood.status === "nearly expired" && (
              <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                Nearly Expired
              </span>
            )}
          </div>

          {/* User Info */}
          {singleFood.userInfo && (
            <div className="flex items-center gap-3 mb-4">
              <img
                src={singleFood.userInfo.photoURL}
                alt={singleFood.userInfo.name}
                title={singleFood.userInfo.name}
                className="w-10 h-10 rounded-full border object-cover transform hover:scale-105 transition"
              />
              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Shared by{" "}
                  <span className="font-medium">
                    {singleFood.userInfo.name}
                  </span>
                </p>

              </div>
            </div>
          )}

          {/* Image */}
          <PhotoProvider>
            <PhotoView src={singleFood.foodImage}>
              <motion.img
                src={singleFood.foodImage}
                alt={singleFood.title}
                className="w-full h-[380px] object-cover rounded-md shadow mb-4 cursor-zoom-in"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.2 }}
              />
            </PhotoView>
          </PhotoProvider>

          {/* Info Section */}
          <div
            className={`space-y-3 mt-4 text-sm ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaTags className="text-green-500" />
              <span>
                <strong>Category:</strong> {singleFood.category}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FaInfoCircle className="text-green-500 mt-1" />
              <span>
                <strong>Description:</strong> {singleFood.description}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaBoxes className="text-green-500" />
              <span>
                <strong>Quantity:</strong> {singleFood.quantity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" />
              <span>
                <strong>Added:</strong> {dayjs(singleFood.addedDate).fromNow()}
              </span>
            </div>
          </div>

          <CountdownTimer expiryDate={singleFood.expiryDate} />

          {/* Owner Controls */}
          {isOwner && (
            <div className="flex gap-3 mt-4">
              <Link
                to={`/update-item/${singleFood._id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={async () => {
                  const deleted = await handleDeleteItem(singleFood._id);
                  if (deleted) {
                    navigate("/fridge");
                  }
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          )}

          <div className="mt-4">
            <Link
              to="/fridge"
              className="text-sm text-blue-400 hover:underline"
            >
              ← Back to Fridge
            </Link>
          </div>
        </motion.div>

        {/* Note Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={baseCard}
        >
          <NoteInput
            foodId={singleFood._id}
            isOwner={isOwner}
            user={user}
            onNoteAdded={fetchNotes}
          />
        </motion.div>
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-12 md:col-span-6"
      >
        <div className={baseCard}>
          <h3 className="text-lg font-semibold mb-2">Notes ({notes.length})</h3>

          <NoteList
            foodId={singleFood._id}
            isOwner={isOwner}
            notes={notes}
            user={user}
            onNoteDeleted={fetchNotes}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Details;
