import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../api/api";

export const handleDeleteNote = async (id, isDark = false) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete the note.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    background: isDark ? "#1a1a1a" : "#fff",
    color: isDark ? "#f0f0f0" : "#000",
    confirmButtonColor: "#388E3C",
    cancelButtonColor: "#d33",
  });

  if (confirm.isConfirmed) {
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted.");
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note.");
    }
  }

  return false;
};
