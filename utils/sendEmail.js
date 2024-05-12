import nodemailer from 'nodemailer';

const sendEmail = async (data) => {
    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lawrence.mraz@ethereal.email',
            pass: 'wZkaxkWA6PDzaAvC9y'
        }
    });
    let mailOptions = {
        from: 'lawrence.mraz@ethereal.email',
        to: 'waghchaureomkar@gmail.com',
        subject: 'omkar',
        text: 'hellow omkar'
    };
    let info = await transporter.sendMail(mailOptions);
    console.log(info);
}
sendEmail("omkar");