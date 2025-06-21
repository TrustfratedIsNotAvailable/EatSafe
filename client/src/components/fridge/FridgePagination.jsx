import React from "react";
import { useTheme } from "../../hooks/ThemeContext"; // adjust path as needed

const FridgePagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseBtnClass = "btn btn-sm transition-colors duration-200";
  const disabledBtnClass = `${baseBtnClass} btn-disabled`;

  const btnBgClass = isDark ? "bg-gray-700" : "bg-base-300";
  const btnActiveClass = isDark ? "btn-primary" : "btn-primary"; // keep btn-primary same for both themes

  const inputBgClass = isDark ? "bg-gray-800 text-gray-200 placeholder-gray-400" : "bg-white text-gray-700 placeholder-gray-500";
  const inputBorderClass = isDark ? "input-bordered border-gray-600 focus:ring-green-600" : "input-bordered border-gray-300 focus:ring-[#1B5E20]";

  const goBtnClass = isDark
    ? "btn btn-sm bg-green-700 hover:bg-green-800 text-white"
    : "btn btn-sm bg-[#43AF50] hover:bg-green-600 text-white";

  return (
    <div className={`flex flex-col items-center mt-8 gap-3 text-${isDark ? "gray-300" : "gray-700"}`}>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`${baseBtnClass} ${btnBgClass}`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .reduce((acc, page, i, arr) => {
            if (i > 0 && page - arr[i - 1] > 1) acc.push("ellipsis");
            acc.push(page);
            return acc;
          }, [])
          .map((page, i) =>
            page === "ellipsis" ? (
              <span key={i} className={disabledBtnClass}>
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`${baseBtnClass} ${
                  currentPage === page ? btnActiveClass : btnBgClass
                }`}
              >
                {page}
              </button>
            )
          )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`${baseBtnClass} ${btnBgClass}`}
        >
          Next
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const page = parseInt(e.target.jumpPage.value, 10);
          if (!isNaN(page) && page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            e.target.reset();
          }
        }}
        className="flex items-center gap-2"
      >
        <input
          type="number"
          name="jumpPage"
          min="1"
          max={totalPages}
          placeholder="Go to"
          className={`input input-sm ${inputBorderClass} focus:outline-none w-20 ${inputBgClass}`}
        />
        <button type="submit" className={goBtnClass}>
          Go
        </button>
      </form>
    </div>
  );
};

export default FridgePagination;
