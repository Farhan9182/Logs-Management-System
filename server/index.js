const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// DB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Dyte-Logs"
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const logRoutes = require('./src/routes/logs');

app.use('/logs', logRoutes);

app.get('/', (req, res) =>
  res.status(200).json({
    code: 200,
    message: 'running normally...',
    result: {
      name: "Logs Management Service",
      env: "local",
      version: 1.0,
    },
  }),
);
/* Error handling */
app.use((req, res) => {
    const error = new Error('route not found');
    return res.status(404).json({
      code: '404',
      message: "Route not found",
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
