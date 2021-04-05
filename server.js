const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const server = express();

// Connect Database
connectDB();

// Middleware
server.use(morgan('dev'));
server.use(express.json({ extended: false }));

server.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact Keeper API!' })
);

// Define Routes
server.use('/api/users', require('./routes/users'));
server.use('/api/contacts', require('./routes/contacts'));
server.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
