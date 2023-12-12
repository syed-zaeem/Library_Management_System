import React, { useEffect, useState } from 'react';
import Book from './Book';

const Explore = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    // Fetch books from the API with the authorization header
    fetch('http://localhost:3005/api/book', {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the token in the request headers
      },
    })
      .then(response => response.json())
      .then(data => {
        // Once data is fetched, update the state with the books
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to filter books based on search query
  const filteredBooks = books.filter(book => {
    // Convert each book object to an array of its values and check if any value matches the search query
    const bookValues = Object.values(book).map(value =>
      typeof value === 'string' ? value.toLowerCase() : ''
    );
    return bookValues.some(value => value.includes(searchQuery.toLowerCase()));
  });

  // Handler for search input change
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-3/4 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-full bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 rounded-md px-4 py-2"
          />
        </div>
      </div>
      <Book books={filteredBooks} />
    </>
  );
};

export default Explore;
