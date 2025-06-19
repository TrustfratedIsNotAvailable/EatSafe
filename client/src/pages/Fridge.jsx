import React, { useState, useMemo } from "react";
import FridgeHeroSection from "../components/fridge/FridgeHeroSection";
import FridgeCards from "../components/fridge/FridgeCards";
import FridgePagination from "../components/fridge/FridgePagination";
import FridgeFilterSort from "../components/fridge/FridgeFilterSort";
import { useLoaderData } from "react-router";

const Fridge = () => {
  const food = useLoaderData();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Categories",
    "Fruits",
    "Vegetables",
    "Grains & Cereals",
    "Dairy Products",
    "Meat & Poultry",
    "Seafood",
    "Snacks",
    "Beverages",
    "Baked Goods",
    "other",
  ];

  // Filter, Search & Sort Logic
  const filteredAndSortedFood = useMemo(() => {
    //filter
    let filtered =
      selectedCategory === "All Categories"
        ? [...food]
        : food.filter((item) => item.category === selectedCategory);

    //search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(q)
      );
    }

    //sort
    switch (sortOption) {
      case "expiry-asc":
        filtered.sort(
          (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
        );
        break;
      case "expiry-desc":
        filtered.sort(
          (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [food, sortOption, selectedCategory, searchQuery]);

  // Pagination
  const itemsPerPage = 12;
  const totalItems = filteredAndSortedFood.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredAndSortedFood.slice(startIndex, endIndex);

  return (
    <>
      <FridgeHeroSection
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
      />

      <div className="max-w-6xl mx-auto p-6">
        {/* <ExpiryCountUp /> */}
        {/* Filter & Sort Controls */}
        <FridgeFilterSort
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          selectedCategory={selectedCategory}
          setSelectedCategory={(val) => {
            setSelectedCategory(val);
            setCurrentPage(1);
          }}
          categories={categories}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Cards */}
        <FridgeCards currentItems={currentItems} />

        {/* Pagination */}
        <FridgePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Fridge;
