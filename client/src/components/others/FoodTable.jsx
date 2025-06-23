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
  FaLeaf,
  FaListAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useTheme } from "../../hooks/ThemeContext";
import { handleDeleteItem } from "../../utils/DeleteItem";
import RecipeSuggestions from "../../pages/RecipeSuggestions";

const FoodTable = ({ myItems, setMyItems }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showGenerateOptions, setShowGenerateOptions] = useState(false);
  const [selectedRecipeMode, setSelectedRecipeMode] = useState(null);

  const nearlyExpiredItems = useMemo(
    () => myItems.filter((item) => item.status === "nearly expired"),
    [myItems]
  );

  const nonExpiredItems = useMemo(
    () => myItems.filter((item) => item.status !== "expired"),
    [myItems]
  );

  const handleGenerateClick = () => {
    setShowGenerateOptions(true);
    setSelectedRecipeMode(null);
  };

  const columnHelper = createColumnHelper();
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 6;
  const [sortOrder, setSortOrder] = useState("none");

  const sortedItems = useMemo(() => {
    if (sortOrder === "none") return myItems;
    return [...myItems].sort((a, b) => {
      const dateA = new Date(a.expiryDate);
      const dateB = new Date(b.expiryDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [myItems, sortOrder]);

  const paginatedItems = useMemo(() => {
    const start = pageIndex * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, pageIndex]);

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
              setPageIndex(0);
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
              onClick={() => handleDeleteItem(row.original._id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      }),
    ],
    [setMyItems, sortOrder]
  );

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
          <thead className={headerBg}>
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
                } ${
                  isDark
                    ? "bg-gray-900 text-gray-200"
                    : "bg-white text-gray-900"
                } hover:bg-opacity-90 ${rowBorder} ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
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

        {/* <div className="flex justify-end gap-4 p-4">
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
        </div> */}
        <div
          className={`flex justify-end gap-4 p-4 rounded-md ${
            isDark
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-300"
          }`}
        >
          <button
            onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
            disabled={pageIndex === 0}
            className={`px-3 py-1 rounded disabled:opacity-50 transition-colors ${
              isDark
                ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-900"
                : "bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
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
            className={`px-3 py-1 rounded disabled:opacity-50 transition-colors ${
              isDark
                ? "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-900"
                : "bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Recipe Generate Section  */}
      <div className="mt-10">
        {!showGenerateOptions && (
          <div className="flex justify-center">
            <button
              onClick={handleGenerateClick}
              className={`px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
                isDark
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
              }`}
            >
              🍽️ Generate Recipes
            </button>
          </div>
        )}

        {showGenerateOptions && !selectedRecipeMode && (
          <div className="mt-8 text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                isDark ? "text-emerald-300" : "text-emerald-700"
              }`}
            >
              What kind of recipes would you like?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setSelectedRecipeMode("nearlyExpired")}
                className={`flex items-center gap-2 px-5 py-3 font-medium rounded-lg shadow transition ${
                  isDark
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                <FaLeaf />
                Nearly Expired Items
              </button>
              <button
                onClick={() => setSelectedRecipeMode("allNonExpired")}
                className={`flex items-center gap-2 px-5 py-3 font-medium rounded-lg shadow transition ${
                  isDark
                    ? "bg-indigo-700 text-white hover:bg-indigo-800"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <FaListAlt />
                All Non-Expired Items
              </button>
            </div>
          </div>
        )}

        {selectedRecipeMode && (
          <div className="mt-10 px-4 sm:px-8">
            <RecipeSuggestions
              expiringFoods={
                selectedRecipeMode === "nearlyExpired"
                  ? nearlyExpiredItems
                  : nonExpiredItems
              }
              mode={selectedRecipeMode}
            />

            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setSelectedRecipeMode(null);
                  setShowGenerateOptions(false);
                }}
                className={`px-5 py-2 rounded-md transition ${
                  isDark
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                🔄 Generate Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodTable;
