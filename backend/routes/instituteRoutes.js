const express = require('express');
const router = express.Router();
const controller = require('../controllers/instituteController');

router.post('/', controller.addInstitute);
router.get('/', controller.getAllInstitutes);
router.get('/:id', controller.getInstituteById);
router.post('/login', controller.loginInstitute);

module.exports = router;