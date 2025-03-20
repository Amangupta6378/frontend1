const Student = require('../models/Student');
const Institute = require('../models/Institute');
const { sendEmail, sendWhatsAppMessage } = require('../services/EmailService');

exports.addStudent = async (req, res, next) => {
    try {
        const { studentName, degree, course, academicYear, rollNo, contactName, 
                contactPhone, contactEmail, institute } = req.body;

        // Validate institute ID
        if (!mongoose.Types.ObjectId.isValid(institute)) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid Institute ID format'
            });
        }

        // Check if institute exists
        const instituteExists = await Institute.findById(institute);
        if (!instituteExists) {
            return res.status(404).json({
                success: false,
                error: 'Institute not found'
            });
        }

        const newStudent = new Student({
            studentName,
            degree,
            course,
            academicYear,
            rollNo,
            contactName,
            contactPhone,
            contactEmail,
            institute
        });

        const savedStudent = await newStudent.save();
        
        res.status(201).json({
            success: true,
            data: savedStudent
        });

    } catch (error) {
        next(error);
    }
};

exports.getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate('institute', 'name -_id');

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        next(error);
    }
};

exports.updateFeeStructure = async (req, res, next) => {
    try {
        const { tuitionFee, hostelFee, miscFee, totalFee, extraFees } = req.body;
        
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    'feeStructure.tuitionFee': tuitionFee,
                    'feeStructure.hostelFee': hostelFee,
                    'feeStructure.miscFee': miscFee,
                    'feeStructure.totalFee': totalFee,
                    'feeStructure.extraFees': extraFees
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedStudent
        });

    } catch (error) {
        next(error);
    }
};

exports.saveInstallments = async (req, res, next) => {
    try {
        const { installments } = req.body;
        
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { installments },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedStudent
        });

    } catch (error) {
        next(error);
    }
};

exports.getStudentsByInstituteId = async (req, res, next) => {
    try {
        const students = await Student.find({ institute: req.params.instituteId })
            .populate('institute', 'name')
            .lean();

        if (!students.length) {
            return res.status(404).json({
                success: false,
                error: 'No students found for this institute'
            });
        }

        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });

    } catch (error) {
        next(error);
    }
};

exports.getFeeDetails = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
            .select('feeStructure -_id');

        if (!student) {
            return res.status(404).json({
                success: false,
                error: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: student.feeStructure
        });

    } catch (error) {
        next(error);
    }
};