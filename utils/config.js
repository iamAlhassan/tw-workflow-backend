const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://xhabbirhsn:Hassan%409798@cluster-dev.vjuj9.mongodb.net/MoviesDesk?retryWrites=true&w=majority&appName=Cluster-dev';

function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURI)
        .then(() => {
            resolve('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            reject(err);
        });
    });
}

// validate object ID
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: err.message 
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate entry found' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = {
  connectDB,
  isValidObjectId,
  errorHandler
};
