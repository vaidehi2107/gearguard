const express = require('express');
const router = express.Router();
const maintCtrl = require('../controllers/maintenanceController');

router.get('/', maintCtrl.index); // Kanban board
router.get('/new', maintCtrl.renderNewForm); // Form page
router.post('/', maintCtrl.createRequest); // Form submission
router.patch('/:id/stage', maintCtrl.updateStage); // Kanban stage update
router.get('/calendar', maintCtrl.renderCalendar);

module.exports = router;