const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/feeds', require('./routes/feeds'));
app.use('/register', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/login', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/topic', require('./routes/topic'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
