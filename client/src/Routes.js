import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import BulkAddLogs from './components/BulkAddLogs';
import AddLogs from './components/AddLogs';
import ViewLogs from './components/ViewLogs';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/bulkAddLogs" element={<BulkAddLogs />} />
        <Route path="/addLogs" element={<AddLogs />} />
        <Route path="/viewLogs" element={<ViewLogs />} />
      </Routes>
    );
  };
  
  export default AppRoutes;