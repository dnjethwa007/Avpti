const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'jethwadeven70@gmail.com', // your Gmail address
        pass: 'ypmafnrwbscvorqj'     // app-specific password
    }
});

let mailOptions = {
    from: 'jethwadeven70@gmail.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello, this is a test email!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
