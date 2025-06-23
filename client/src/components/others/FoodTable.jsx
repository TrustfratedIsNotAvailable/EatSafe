import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  FaEdit,
  FaSort,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useTheme } from "../../hooks/ThemeContext";

const FoodTable = ({ myItems, setMyItems }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const columnHelper = createColumnHelper();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 6;

  // New: sorting state: "asc", "desc", or "none"
  const [sortOrder, setSortOrder] = useState("none");

  // Sorted & paginated items
  const sortedItems = useMemo(() => {
    if (sortOrder === "none") return myItems;

    // Sort by expiryDate
    return [...myItems].sort((a, b) => {
      const dateA = new Date(a.expiryDate);
      const dateB = new Date(b.expiryDate);

      if (sortOrder === "asc") return dateA - dateB;
      else if (sortOrder === "desc") return dateB - dateA;
      return 0;
    });
  }, [myItems, sortOrder]);

  const paginatedItems = useMemo(() => {
    const start = pageIndex * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, pageIndex]);

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
        const res = await axios.delete(
          `https://eatsafe-server.vercel.app/food/${id}`
        );

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
        cell: (info) => {
          const category = info.getValue();
          let baseClasses =
            "text-xs px-2 py-1 rounded-full font-medium inline-block text-center";

          const categoryStyles = {
            Vegetables: "bg-green-100 text-green-800",
            Fruits: "bg-orange-100 text-orange-800",
            Dairy: "bg-blue-100 text-blue-800",
            Grains: "bg-yellow-100 text-yellow-800",
            Meat: "bg-red-100 text-red-800",
            Other: "bg-gray-200 text-gray-800",
          };

          const style = categoryStyles[category] || "bg-gray-100 text-gray-800";

          return <span className={`${baseClasses} ${style}`}>{category}</span>;
        },
      }),

      columnHelper.accessor("quantity", {
        header: "Quantity",
        cell: (info) => <span>{info.getValue()}</span>,
      }),

      columnHelper.accessor("expiryDate", {
        header: () => (
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => {
              setSortOrder((prev) =>
                prev === "none" ? "asc" : prev === "asc" ? "desc" : "none"
              );
              setPageIndex(0); // Reset to first page on sort change
            }}
          >
            <span>Expiry Date</span>

            {sortOrder === "asc" ? (
              <FaSortAmountUp className="text-red-600" />
            ) : sortOrder === "desc" ? (
              <FaSortAmountDown className="text-green-600" />
            ) : (
              <FaSort className="text-gray-400 opacity-70" />
            )}
          </div>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
      }),

      columnHelper.accessor("status", {
        header: "Status",
        // cell: (info) => <span>{info.getValue()}</span>,
        cell: (info) => {
          const value = info.getValue();
          let className =
            "text-xs px-2 py-1 rounded font-medium inline-block text-center";

          if (value === "expired") {
            className += " bg-red-600 text-white";
          } else if (value === "nearly expired") {
            className += " bg-yellow-500 text-white";
          } else {
            className += " bg-green-500 text-white";
          }

          return <span className={className}>{value}</span>;
        },
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
    [setMyItems, sortOrder]
  );

  // Dynamic class mappings based on theme
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
    pageCount: Math.ceil(sortedItems.length / pageSize),
    manualPagination: false,
  });

  const headerBg = isDark
    ? "bg-gray-800 text-white"
    : "bg-white text-[#1B5E20]";
  const rowBorder = isDark ? "border-gray-700" : "border-b-gray-200";
  const paginationText = isDark ? "text-gray-300" : "text-gray-600";
  const btnBg = isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black";

  return (
    <>
      <div
        className={`overflow-x-auto rounded-lg border ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <table className="min-w-full table-auto">
          <thead className={`${headerBg}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`py-5 px-4 text-left border-b ${rowBorder}`}
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
                    ? "border-red-500"
                    : row.original.status === "nearly expired"
                    ? "border-yellow-500"
                    : "border-green-500"
                } hover:bg-opacity-90 ${rowBorder}`}
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
            className={`px-3 py-1 rounded disabled:opacity-50 ${btnBg}`}
          >
            Previous
          </button>
          <span className={`text-sm ${paginationText}`}>
            Page {pageIndex + 1} of {Math.ceil(sortedItems.length / pageSize)}
          </span>
          <button
            onClick={() =>
              setPageIndex((old) =>
                old + 1 < Math.ceil(sortedItems.length / pageSize)
                  ? old + 1
                  : old
              )
            }
            disabled={pageIndex + 1 >= Math.ceil(sortedItems.length / pageSize)}
            className={`px-3 py-1 rounded disabled:opacity-50 ${btnBg}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodTable;
