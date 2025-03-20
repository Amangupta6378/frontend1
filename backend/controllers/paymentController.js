const axios = require('axios');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config/constant');
const { sendEmail, sendWhatsAppMessage } = require('../services/EmailService');

exports.createPaymentLink = async (req, res, next) => {
    try {
        const { email, amount, phone } = req.body;
        
        const response = await axios.post(
            'https://api.razorpay.com/v1/payment_links',
            {
                amount: amount * 100,
                currency: 'INR',
                description: 'Fee Payment',
                customer: { email },
                notify: { email: true }
            },
            {
                auth: {
                    username: RAZORPAY_KEY_ID,
                    password: RAZORPAY_KEY_SECRET
                }
            }
        );

        const paymentLink = response.data.short_url;

        await sendEmail(email, paymentLink);
        await sendWhatsAppMessage(phone, paymentLink);

        res.json({
            success: true,
            paymentLink
        });

    } catch (error) {
        next(error);
    }
};