const mongoose = require('mongoose');
const maintenanceSchema = new mongoose.Schema({
    subject: String,
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Auto-filled from Equipment
    requestType: { type: String, enum: ['Corrective', 'Preventive'], required: true },
    stage: { 
        type: String, 
        enum: ['New', 'In Progress', 'Repaired', 'Scrap'], 
        default: 'New' 
    },
    scheduledDate: Date,
    assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Maintenance', maintenanceSchema);