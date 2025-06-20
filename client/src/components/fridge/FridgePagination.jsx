import React from "react";

const FridgePagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className="flex flex-col items-center mt-8 gap-3">
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-sm bg-base-300"
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
              <span key={i} className="btn btn-sm btn-disabled">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "bg-base-300"
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
          className="btn btn-sm bg-base-300"
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
          className="input input-sm input-bordered focus:outline-none focus:ring-2 focus:ring-[#1B5E20] w-20"
        />
        <button type="submit" className="btn btn-sm bg-[#43AF50]">
          Go
        </button>
      </form>
    </div>
  );
};

export default FridgePagination;
