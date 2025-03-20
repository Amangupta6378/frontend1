const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require("mongodb"); // Ensure ObjectId is imported
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
require("dotenv").config();
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const axios = require('axios');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smartfeeAdmin')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Institute Schema
const instituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const Institute = mongoose.model('Institute', instituteSchema);





// Route to add a new institute
app.post('/api/institutes', async (req, res) => {
    const { name, password } = req.body;
    try {
        const newInstitute = new Institute({ name, password });
        await newInstitute.save();
        res.status(201).json({ message: 'Institute added successfully', institute: newInstitute });
    } catch (error) {
        res.status(400).json({ error: 'Error adding institute' });
    }
});

// Route to get all institutes
app.get('/api/institutes', async (req, res) => {
    try {
        const institutes = await Institute.find({});
        res.status(200).json(institutes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching institutes' });
    }
});
//to get institute
app.get('/api/institutes/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Fetching institute with ID:", id); // 👀 Debugging ke liye

    try {
        const institute = await Institute.findById(id);
        if (!institute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json({ name: institute.name });
    } catch (error) {
        console.error('Error fetching institute:', error);
        res.status(500).json({ error: 'Error fetching institute details' });
    }
});
//login-institute
app.post('/api/institutes/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const institute = await Institute.findOne({ name });

        if (!institute || institute.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token if using JWT (optional)
        const token = "dummyTokenForNow"; 

        res.json({ success: true, token, instituteId: institute._id }); // Send institute ID
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});



app.get('/api/institutes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const institute = await Institute.findById(id);
        if (!institute) {
            return res.status(404).json({ error: 'Institute not found' });
        }
        res.status(200).json(institute); // 👈 Yeh poora schema bhej raha hai
    } catch (error) {
        console.error('Error fetching institute:', error);
        res.status(500).json({ error: 'Error fetching institute details' });
    }
});




// Define the Student Schema
const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    degree: { type: String, required: true },
    course: { type: String, required: true },
    academicYear: { type: String, required: true },
    rollNo: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: "Institute", required: true },
    feeStructure: {
        tuitionFee: { type: Number, default: 0 },
        hostelFee: { type: Number, default: 0 },
        miscFee: { type: Number, default: 0 },
        totalFee: { type: Number, default: 0 },
        extraFees: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
            },
        ], 
    },
    installments: [
        {
            installmentNo: { type: Number },
            amount: { type: Number },
            dueDate: { type: Date }
        }
    ],
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);


app.post('/api/students', async (req, res) => {
    const {
        studentName,
        degree,
        course,
        academicYear,
        rollNo,
        contactName,
        contactPhone,
        contactEmail,
        institute // Expecting an ID, not an object
    } = req.body;

    try {
        console.log("Received institute ID:", institute);

        // ✅ Ensure institute ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(institute)) {
            return res.status(400).json({ error: 'Invalid Institute ID' });
        }

        const instituteDoc = await Institute.findById(institute);
        if (!instituteDoc) {
            return res.status(404).json({ error: 'Institute not found' });
        }

        // ✅ Save student with institute ID
        const newStudent = new Student({
            studentName,
            degree,
            course,
            academicYear,
            rollNo,
            contactName,
            contactPhone,
            contactEmail,
            institute: instituteDoc._id // ✅ Only store ID, not full object
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        console.error('Error in adding student:', error);
        res.status(400).json({ error: 'Error adding student', details: error.message });
    }
});
//to get students:
app.get('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // ✅ Fetch student and populate institute name
        const student = await Student.findById(id).populate("institute", "name");
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Error fetching student details', details: error.message });
    }
});
// ✅ Get all students of a specific institute
app.get('/api/students/institute/:instituteId', async (req, res) => {
    try {
        console.log("Fetching students for institute:", req.params.instituteId);

        const students = await Student.find({ institute: req.params.instituteId });

        if (!students.length) {
            return res.status(404).json({ message: "No students found." });
        }

        res.status(200).json(students); // ✅ Ensure JSON response
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" }); // ✅ JSON return karo
    }
});





//for fee comp

app.put('/api/students/:id/fees', async (req, res) => {
    const { id } = req.params;
    let { tuitionFee, hostelFee, miscFee, totalFee, extraFees } = req.body;

    console.log("Received ID:", id);
    console.log("Received Fee Data:", req.body);

    if (!Array.isArray(extraFees)) {
        extraFees = []; // ✅ Ensure it's always an array
    }

    if (!id || tuitionFee === undefined || hostelFee === undefined || miscFee === undefined || totalFee === undefined) {
        return res.status(400).json({ error: "Invalid data format" });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            {
                $set: {
                    "feeStructure.tuitionFee": tuitionFee,
                    "feeStructure.hostelFee": hostelFee,
                    "feeStructure.miscFee": miscFee,
                    "feeStructure.totalFee": totalFee,
                    "feeStructure.extraFees": extraFees // ✅ Fix applied here
                }
            },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        console.log("Updated Student Data:", updatedStudent.feeStructure); // ✅ Check if extraFees exists now
        res.status(200).json({ message: "Fee updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Error updating fee details:", error);
        res.status(500).json({ error: "Error updating fee details" });
    }
});



// Route to save installments for a student by ID
app.post('/api/students/:id/installments', async (req, res) => {
    const { id } = req.params;
    const { installments } = req.body;

    console.log("Received Installments:", installments); // ✅ Debugging

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { $set: { installments: installments } },
            { new: true }
        );

        console.log("Updated Student:", updatedStudent); // ✅ Check if it updates

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Installments saved successfully', student: updatedStudent });
    } catch (error) {
        console.error('Error saving installments:', error);
        res.status(500).json({ error: 'Error saving installments' });
    }
});



// Route to get fee details for a student by ID
app.get('/api/students/:id/fees', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        console.log("Fetched Student:", student); // ✅ Debugging 
        console.log("Fee Structure:", student.feeStructure); // ✅ Check if feeStructure is coming

        res.status(200).json(student.feeStructure);
    } catch (error) {
        console.error('Error fetching fee details:', error);
        res.status(500).json({ error: 'Error fetching fee details' });
    }
});


// Twilio client
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Route to create a Razorpay payment link and send it via email & WhatsApp
app.post("/api/students/create-payment-link", async (req, res) => {
    const { email, amount, phone } = req.body;

    try {
        const response = await axios.post(
            "https://api.razorpay.com/v1/payment_links",
            {
                amount: amount * 100, // Convert to paise
                currency: "INR",
                description: "Payment for your order",
                customer: { email: email },
                notify: { email: true, sms: false },
                callback_url: undefined,
                callback_method: "get",
            },
            {
                auth: {
                    username: RAZORPAY_KEY_ID,
                    password: RAZORPAY_KEY_SECRET,
                },
            }
        );

        const paymentLink = response.data.short_url;

        // Send Email
        const emailStatus = await sendEmail(email, paymentLink);

        // Send WhatsApp message
        const whatsappStatus = await sendWhatsAppMessage(phone, paymentLink);

        res.json({
            success: true,
            message: "Payment link sent successfully.",
            paymentLink,
            emailStatus,
            whatsappStatus,
        });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create payment link.",
            error: error.response?.data || error.message,
        });
    }
});

// Function to send email
const sendEmail = (email, paymentLink) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: EMAIL_USER,
            to: email,
            subject: "Payment Link",
            html: `<p>Please complete your payment using the link below:</p>
                   <a href="${paymentLink}">${paymentLink}</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                resolve({ success: false, message: "Email sending failed." });
            } else {
                console.log("Email sent successfully:", info.response);
                resolve({ success: true, message: "Email sent successfully." });
            }
        });
    });
};

// Function to send WhatsApp message
const sendWhatsAppMessage = (phone, paymentLink) => {
    return new Promise((resolve, reject) => {
        client.messages
            .create({
                from: TWILIO_WHATSAPP_NUMBER,
                to: `whatsapp:${phone}`,
                body: `Hello! Here is your payment link: ${paymentLink}. Please complete your payment.`,
            })
            .then((message) => {
                console.log(`WhatsApp message sent: ${phone}`);
                resolve({ success: true, message: "WhatsApp message sent successfully." });
            })
            .catch((error) => {
                console.error("Error sending WhatsApp message:", error);
                resolve({ success: false, message: "WhatsApp message failed." });
            });
    });
};


// ✅ Route to get a specific student by ID
app.get('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // ✅ Fetch student and populate institute name
        const student = await Student.findById(id).populate("institute", "name");
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Error fetching student details', details: error.message });
    }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
