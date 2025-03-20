const axios = require('axios');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config/constants');

class RazorpayService {
  static async createPaymentLink(amount, email) {
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
    return response.data.short_url;
  }
}

module.exports = RazorpayService;