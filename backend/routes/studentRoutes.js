const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student CRUD Operations
router.post('/', studentController.addStudent);
router.get('/:id', studentController.getStudentById);
router.put('/:id/fees', studentController.updateFeeStructure);
router.post('/:id/installments', studentController.saveInstallments);

// Institute-specific Students
router.get('/institute/:instituteId', studentController.getStudentsByInstituteId);

// Fee Operations
router.get('/:id/fees', studentController.getFeeDetails);

module.exports = router;