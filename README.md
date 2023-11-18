# Log Ingestor and Query Interface

## _Objective: Develop a log ingestor system that can efficiently handle vast volumes of log data and offer a simple interface for querying this data using full-text search or specific field filters_.

## ---------------------- Tech Stack ---------------------------------
- Backend: Node.js with Express, MongoDB (Mongoose for ODM)
- Frontend: React
- Database: MongoDB
- Other Technologies: Axios, Tailwind CSS

## ----------------- Directory Structure -----------------------------
```sh
project-root
|-- client (Frontend)
|-- server (Backend)
```
## -------------------- System Design --------------------------------
> The system consists of a Node.js backend using Express for handling log ingestion and queries. MongoDB is employed as the database, and the frontend is developed using React. The directory structure is organized into 'client' for the frontend and 'server' for the backend.

## ----------------- Features Implemented ----------------------------
 - Log ingestion over HTTP on port 3000, endpoint "/logs/create" and "/logs/bulkCreate"
 - Full-text search and specific field filters (level, message, resourceId, timestamp, traceId, spanId, commit, metadata.parentResourceId).
 - Advanced features include search within specific date ranges, regular expressions for search (message field only), combining multiple filters, and real-time log ingestion.
 - Pagination for efficient api calls

## ------------------ How to Run the Project --------------------------
_Start the server_:
```sh
cd server
npm install
npm start
```
_Start the client_:
```sh
cd client
npm install
npm start
```
Access the application at [http://localhost:3006]