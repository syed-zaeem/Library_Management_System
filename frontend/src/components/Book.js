import React, { useState } from 'react';

const Book = ({ books }) => {
  const [requestedBooks, setRequestedBooks] = useState([]);

  const handleRequest = (bookId) => {
    console.log(bookId)
    const authToken = localStorage.getItem('token')
    fetch(`http://localhost:3005/api/book/allocate/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the token in the request headers
      },
      body: JSON.stringify({ bookId }),
    })
    .then(response => {
      setRequestedBooks([...requestedBooks, bookId]);
    })
    .catch(error => {
      console.error('Error requesting book:', error);
    });
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                  Title
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                  Author
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                  ISBN
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                  Published Date
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">
                  Request
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm text-gray-900">{book.author}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm text-gray-900">{book.ISBN}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(book.publishedDate).toDateString()}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <button
                    
                      onClick={() => handleRequest(book._id)}
                      disabled={requestedBooks.includes(book._id)}
                      className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      {requestedBooks.includes(book._id) ? 'Requested' : 'Request'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Book;
