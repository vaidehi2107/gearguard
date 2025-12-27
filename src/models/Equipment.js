const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: { type: String, required: true },
    isUsable: { type: Boolean, default: true },
    maintenanceTeam: { type: String },
    technician: { type: String }
}, { collection: 'equipment' }); // <--- Add this line!

module.exports = mongoose.model('Equipment', equipmentSchema);