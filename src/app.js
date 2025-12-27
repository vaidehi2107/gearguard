const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const engine = require('ejs-mate');
const methodOverride = require('method-override');

const equipmentRoutes = require('./routes/equipmentRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(methodOverride('_method')); // For PATCH/DELETE from forms
app.use(express.static(path.join(__dirname, 'public'))); // For CSS/JS

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/equipment', equipmentRoutes);
app.use('/maintenance', maintenanceRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("GearGuard DB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

module.exports = app;