const Maintenance = require('../models/Maintenance');
const Equipment = require('../models/Equipment');

// 1. View all requests (The Kanban Board)
exports.index = async (req, res) => {
    try {
        const requests = await Maintenance.find().populate('equipment');
        // Passing req.query allows EJS to see the ?error=scrapped parameter
        res.render('maintenance/index', { 
            requests, 
            query: req.query 
        });
    } catch (err) {
        res.status(500).send("Error loading Kanban: " + err.message);
    }
};
// 2. Show the "Create New" Form
exports.renderNewForm = async (req, res) => {
    const equipment = await Equipment.find({ isUsable: true }); // Only show usable machines
    const selectedEquipId = req.query.equipmentId || null;
    res.render('maintenance/new', { equipment, selectedEquipId });
};

// 3. Handle Form Submission (With AUTO-FILL logic)
exports.createRequest = async (req, res) => {
    try {
        const { equipment, subject, requestType, scheduledDate } = req.body;
        
        // AUTO-FILL Logic [cite: 40, 41]
        const equipDoc = await Equipment.findById(equipment);
        
        const newRequest = new Maintenance({
            subject,
            equipment,
            requestType,
            scheduledDate, // Save the date from the form
            team: equipDoc.maintenanceTeam, 
            assignedTechnician: equipDoc.technician,
            stage: 'New'
        });

        await newRequest.save();
        res.redirect('/maintenance');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// 4. Update Stage (With SCRAP LOGIC)
exports.updateStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage } = req.body;

        // 1. Find the current request and its equipment status
        const request = await Maintenance.findById(id).populate('equipment');

        // 2. BLOCKING LOGIC: If equipment is already scrapped, prevent moving the card
        if (request.equipment && !request.equipment.isUsable) {
            // We redirect with a query parameter to show a pop-up in the UI
            return res.redirect('/maintenance?error=scrapped');
        }

        // 3. Update the stage
        const updatedRequest = await Maintenance.findByIdAndUpdate(id, { stage }, { new: true });

        // 4. SCRAP LOGIC: Permanent lock
        if (stage === 'Scrap') {
            await Equipment.findByIdAndUpdate(request.equipment._id, { isUsable: false });
        }

        res.redirect('/maintenance');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.renderCalendar = async (req, res) => {
    // Only fetch Preventive requests as per requirement 
    const preventiveRequests = await Maintenance.find({ requestType: 'Preventive' }).populate('equipment');
    res.render('maintenance/calendar', { requests: preventiveRequests });
};