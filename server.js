require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, errorHandler } = require('./utils/config');
const routes = require('./routes/routes');

const app = express();

// connect to database
connectDB()
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.error('Failed to connect to database');
    process.exit(1);
  });

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Assignment Workflow Portal API' 
  });
});

// api routes
app.use('/api', routes);

// error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
