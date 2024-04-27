function sendMail(subject, msg, email) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'publictransportsetup@gmail.com',
            pass: 'jbbjqsrplkcgniyz',
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    //Setup email data
    const mailOptions = {
        from: 'ecosystem750@gmail.com',
        to: email,
        subject: subject,
        text: msg,
        html: '',
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error:', error);
        }
        console.log('Message sent:', info.messageId);
    });
}
function GetOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = { sendMail, GetOtp };