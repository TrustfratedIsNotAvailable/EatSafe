import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useAuth } from "../context/AuthContext";
import NoteList from "../components/details/NoteList";
import CountdownTimer from "../components/details/CountdownTimer";
import NoteInput from "../components/details/NoteInput";
import axios from "axios";

const Details = () => {
  const singleFood = useLoaderData();
  const { user } = useAuth();
  const isOwner = user?.email === singleFood.userEmail;

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://eatsafe-server.vercel.app/notes"
        // `${import.meta.env.VITE_API_URL}/notes`
        , {
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

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Left side */}
      <div className="col-span-12 md:col-span-6 space-y-4">
        <h2 className="text-2xl font-bold">{singleFood.title}</h2>
        <img
          src={singleFood.foodImage}
          alt={singleFood.title}
          className="w-full h-[380px] rounded-lg shadow"
        />
        <p><strong>Category:</strong> {singleFood.category}</p>
        <p><strong>Description:</strong> {singleFood.description}</p>
        <p><strong>Quantity:</strong> {singleFood.quantity}</p>
        <p><strong>Added Date:</strong> {singleFood.addedDate}</p>

        <CountdownTimer expiryDate={singleFood.expiryDate} />

        <NoteInput
          foodId={singleFood._id}
          isOwner={isOwner}
          user={user}
          onNoteAdded={fetchNotes} //refresh method
        />
      </div>

      {/* Right side */}
      <div className="col-span-12 md:col-span-6">
        <NoteList
          foodId={singleFood._id}
          isOwner={isOwner}
          notes={notes}
          user={user}
          onNoteDeleted={fetchNotes} //refresh method
        />
      </div>
    </div>
  );
};

export default Details;
