import nodemailer from 'nodemailer';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.RECIPIENT_EMAIL,
            subject: `New contact form submission: ${subject}`,
            text: `
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                Message: ${message}
            `,
        };

        const sendMail = async () => {
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Message sent successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Failed to send message', error: error.message });
            }
        };
        sendMail();
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
