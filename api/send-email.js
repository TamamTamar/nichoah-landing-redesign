import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const { name, phone, event, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR_EMAIL@gmail.com',
            pass: 'YOUR_APP_PASSWORD'
        }
    });

    await transporter.sendMail({
        from: 'YOUR_EMAIL@gmail.com',
        to: 'nihoahfood@gmail.com',
        subject: 'פנייה חדשה מאתר – קייטרינג ניחוח',
        text: `
      שם: ${name}
      טלפון: ${phone}
      סוג האירוע: ${event}
      הודעה: ${message}
    `
    });

    res.status(200).json({ ok: true });
}
