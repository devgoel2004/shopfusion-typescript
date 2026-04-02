import nodeMailer from 'nodemailer';
interface EmailOptions{
    email: string;
    service?: string;
    subject: string;
    message: string;
}
export const sendEmail = async function(options: EmailOptions){
    // const service = process.env.APP_HOST || "service";
    const transporter = nodeMailer.createTransport({
        service: process.env.APP_HOST || "gmail", 
        auth:{
            user: process.env.APP_EMAIL || "email",
            pass: process.env.APP_PASSWORD || "password",
        }
    });
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: options.email as string,
        subject: options.subject as string,
        text: options.message as string,
    }
    await transporter.sendMail(mailOptions);
}
