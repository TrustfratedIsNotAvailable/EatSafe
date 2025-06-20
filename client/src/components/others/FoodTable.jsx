import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import UpdateItem from "../../pages/UpdateItem";
import { Link } from "react-router";

const FoodTable = ({ myItems, setMyItems }) => {
  const columnHelper = createColumnHelper();

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 6;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/food/${id}`);

        if (res.data.success) {
          setMyItems(myItems.filter((item) => item._id !== id));
          toast.success("Item has been removed.");
        } else {
          toast.error("Could not delete item.");
        }
      } catch (err) {
        Swal.fire("Error", "Server error occurred.", "error");
      }
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("foodImage", {
        header: "Image",
        cell: (info) => (
          <img src={info.getValue()} alt="Food" className="w-12 h-12 rounded" />
        ),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("quantity", {
        header: "Quantity",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("expiryDate", {
        header: "Expiry Date",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Link
              to={`/update-item/${row.original._id}`}
              className="cursor-pointer text-blue-500 hover:text-blue-700"
            >
              <FaEdit />
            </Link>
            <button
              className="cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => handleDelete(row.original._id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      }),
    ],
    [setMyItems]
  );

  const paginatedItems = useMemo(() => {
    const start = pageIndex * pageSize;
    return myItems.slice(start, start + pageSize);
  }, [myItems, pageIndex]);

  const table = useReactTable({
    data: paginatedItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    pageCount: Math.ceil(myItems.length / pageSize),
    manualPagination: false,
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full table-auto">
        <thead className="bg-base-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-5 px-4 text-[#1B5E20] text-left bg-white border-b border-gray-100"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`border-l-4 ${
                row.original.status === "expired"
                  ? "border-red-500 bg-red-100 hover:bg-red-200"
                  : row.original.status === "nearly expired"
                  ? "border-yellow-500 bg-yellow-100 hover:bg-yellow-200"
                  : "border-green-500 hover:bg-green-200"
              } hover:bg-opacity-90 border-b border-b-gray-200`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end gap-4 p-4">
        <button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {pageIndex + 1} of {Math.ceil(myItems.length / pageSize)}
        </span>
        <button
          onClick={() =>
            setPageIndex((old) =>
              old + 1 < Math.ceil(myItems.length / pageSize) ? old + 1 : old
            )
          }
          disabled={pageIndex + 1 >= Math.ceil(myItems.length / pageSize)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FoodTable;
