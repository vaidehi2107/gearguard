const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true }, // e.g., "IT Support", "Mechanics"
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
module.exports = mongoose.model('Team', teamSchema);