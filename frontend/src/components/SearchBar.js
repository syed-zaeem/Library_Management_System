import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-3/4  p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 rounded-md px-4 py-2"
        />
      </div>
    </div>
  );
};

export default SearchBar;
