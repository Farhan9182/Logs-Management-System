import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Log Management System</h1>
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/bulkAddLogs" className="text-blue-500 hover:underline">
              Bulk Add Logs
            </Link>
          </li>
          <li>
            <Link to="/addLogs" className="text-blue-500 hover:underline">
              Add Logs
            </Link>
          </li>
          <li>
            <Link to="/viewLogs" className="text-blue-500 hover:underline">
              View Logs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Homepage;
