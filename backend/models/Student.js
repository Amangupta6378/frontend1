const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    degree: { type: String, required: true },
    course: { type: String, required: true },
    academicYear: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    institute: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Institute", 
        required: true 
    },
    feeStructure: {
        tuitionFee: { type: Number, default: 0 },
        hostelFee: { type: Number, default: 0 },
        miscFee: { type: Number, default: 0 },
        totalFee: { type: Number, default: 0 },
        extraFees: [{
            name: { type: String, required: true },
            amount: { type: Number, required: true },
        }]
    },
    installments: [{
        installmentNo: { type: Number, required: true },
        amount: { type: Number, required: true },
        dueDate: { type: Date, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);