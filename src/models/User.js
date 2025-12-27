const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    role: { type: String, enum: ['Manager', 'Technician', 'Employee'], default: 'Employee' }
});
module.exports = mongoose.model('User', userSchema);