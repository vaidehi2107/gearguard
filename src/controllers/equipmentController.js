const Equipment = require('../models/Equipment');
const Maintenance = require('../models/Maintenance');

// 1. List all equipment
exports.index = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.render('equipment/index', { equipment }); // You'll need an index.ejs for this
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// 2. Show single equipment (The Detail View with Smart Button)
exports.showEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        // Populate links to see names of team and tech
        const equipment = await Equipment.findById(id).populate('maintenanceTeam technician');
        
        // SMART BUTTON LOGIC: Requirement 5 - Badge count
        const maintenanceCount = await Maintenance.countDocuments({ equipment: id });

        res.render('equipment/show', { equipment, maintenanceCount });
    } catch (err) {
        res.status(404).send("Equipment not found");
    }
};