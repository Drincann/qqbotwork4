import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '../config'

const { host, port, secure, auth, to } = config.mailer
export async function sendMail({ subject, html }: {
    subject: string, html: string
}): Promise<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
        host, port, secure, auth,
    });

    const info = await transporter.sendMail({
        from: `${auth.user}`,
        to, subject, html,
    });
    transporter.close()
    return info
}

