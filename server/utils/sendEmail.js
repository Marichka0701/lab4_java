const nodeMailer = require("nodemailer");

// Create a transport once
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "mraka.nazar228@gmail.com",
        pass: process.env.MAIL_PASS
    },
    pool: true // Use a connection pool
});

const sendEmail = async (options) => {
    const mailOptions = {
        from: "mraka.nazar228@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message, 
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
