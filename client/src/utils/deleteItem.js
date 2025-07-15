import axios from "axios";
import Swal from "sweetalert2";
import api from "../api/api";

export const handleDeleteItem = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this item!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    try {
      const res = await api.delete(
        `/food/${id}`
      );

      console.log("Delete response:", res.status, res.data);

      if (res.status === 200) {
        await Swal.fire("Deleted!", "Your item has been deleted.", "success");
        return true;
      } else {
        Swal.fire("Error!", "Item not deleted.", "error");
        return false;
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  }

  return false;
};
