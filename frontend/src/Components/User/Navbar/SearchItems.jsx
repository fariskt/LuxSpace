import React, { useEffect, useRef } from "react";

const SearchItems = ({
  filteredProducts,
  searchValue,
  handleSearchProducts,
  inputRef,
  setSearchValue,
}) => {
  const searchItemsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        searchItemsRef.current &&
        !searchItemsRef.current.contains(event.target)
      ) {
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {searchValue && (
        <div
          ref={searchItemsRef}
          className="absolute top-20 ml-56 max-h-[300px] px-2 bg-white overflow-y-scroll flex flex-col shadow-lg"
        >
          {searchValue && filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border-b cursor-pointer border-gray-300 pb-2 hover:bg-gray-100"
                onClick={() => handleSearchProducts(item._id)}
              >
                <div className="w-20 h-16  rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={item.img}
                    alt="image"
                    className="object-contain w-full h-20"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <h4 className="text-xs text-gray-400">{item.category}</h4>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No data found</p>
          )}
        </div>
      )}
    </>
  );
};

export default SearchItems;
