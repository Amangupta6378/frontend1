const Institute = require('../models/Institute');

exports.addInstitute = async (req, res) => {
    try {
        const { name, password } = req.body;
        const institute = new Institute({ name, password });
        await institute.save();
        res.status(201).json({ success: true, data: institute });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find();
        res.status(200).json({ success: true, data: institutes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getInstituteById = async (req, res) => {
    try {
        const institute = await Institute.findById(req.params.id);
        if (!institute) return res.status(404).json({ success: false, error: 'Institute not found' });
        res.status(200).json({ success: true, data: institute });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.loginInstitute = async (req, res) => {
    try {
        const { name, password } = req.body;
        const institute = await Institute.findOne({ name });
        
        if (!institute || institute.password !== password) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        
        res.status(200).json({ 
            success: true, 
            data: { token: 'dummy-token', instituteId: institute._id }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};