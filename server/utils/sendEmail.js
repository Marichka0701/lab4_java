const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "mraka.nazar228@gmail.com",
          pass: process.env.MAIL_PASS
        }
      });
      

    const mailOptions = {
        from: "mraka.nazar228@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message, 
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };