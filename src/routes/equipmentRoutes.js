const express = require('express');
const router = express.Router();
const equipCtrl = require('../controllers/equipmentController');

// 1. Equipment List View (Central Database)
// Path: /equipment
router.get('/', equipCtrl.index);

// 2. Equipment Detail View (The "Master Record" with Smart Button)
// Path: /equipment/:id
router.get('/:id', equipCtrl.showEquipment);

module.exports = router;