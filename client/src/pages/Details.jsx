import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useAuth } from "../context/AuthContext";
import NoteList from "../components/details/NoteList";
import CountdownTimer from "../components/details/CountdownTimer";
import NoteInput from "../components/details/NoteInput";
import { useTheme } from "../hooks/ThemeContext";
import axios from "axios";

const Details = () => {
  const singleFood = useLoaderData();
  const { user } = useAuth();
  const { theme } = useTheme();
  const isOwner = user?.email === singleFood.userEmail;

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://eatsafe-server.vercel.app/notes", {
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
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`;

  const headingStyle = `text-2xl font-bold mb-2 ${
    theme === "dark" ? "text-green-300" : "text-[#1B5E20]"
  }`;

  return (
    <div
      className={`grid grid-cols-12 gap-4 p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >
      {/* Left side */}
      <div className="col-span-12 md:col-span-6 space-y-4">
        <div className={baseCard}>
          <h2 className={headingStyle}>{singleFood.title}</h2>
          <img
            src={singleFood.foodImage}
            alt={singleFood.title}
            className="w-full h-[380px] object-cover rounded-md shadow"
          />
          <p>
            <strong>Category:</strong> {singleFood.category}
          </p>
          <p>
            <strong>Description:</strong> {singleFood.description}
          </p>
          <p>
            <strong>Quantity:</strong> {singleFood.quantity}
          </p>
          <p>
            <strong>Added Date:</strong> {singleFood.addedDate}
          </p>

          <CountdownTimer expiryDate={singleFood.expiryDate} />
        </div>

        {/* Note Input (for adding) */}
        <div className={baseCard}>
          <NoteInput
            foodId={singleFood._id}
            isOwner={isOwner}
            user={user}
            onNoteAdded={fetchNotes}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="col-span-12 md:col-span-6">
        <div className={baseCard}>
          <NoteList
            foodId={singleFood._id}
            isOwner={isOwner}
            notes={notes}
            user={user}
            onNoteDeleted={fetchNotes}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
