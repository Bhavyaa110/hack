import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vinayakjainlife@gamil.com',
        pass: 'suddendeath123@'
    }
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { email, name } = req.body;

    const mailOptions = {
        from: 'vinayakjainlife@gmail.com',
        to: 'vjain2_be23@thapar.edu',
        subject: 'Confirmation Email',
        text: `Hello ${name},\n\nThank you for submitting your item.\n\nBest regards,\nYour Website Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
