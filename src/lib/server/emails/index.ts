/**
 * Emails
 **/
import nodemailer from 'nodemailer';
import { currentAppURI } from '$lib/helpers/navigators';
import { resetPasswordEmail } from './tactics/resetPasswordTemplate';
import { config } from '../../../config';
import { emailStrategyContext } from './emailStrategiesContext';

//
const mailTransport = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: true,
    auth: {
        user: config.email.accountName,
        pass: config.email.accountPW,
    },
});
//
export async function sendResetPasswordEmail(email: string, token: string) {
    const resetURL = `${currentAppURI}/reset-password/${token}`;
    // Set the context
    emailStrategyContext.setStrategy(resetPasswordEmail);
    //
    const outputTemplate = emailStrategyContext.finalTemplate({
        link: resetURL,
    });
    //
    return sendEmail(outputTemplate, email, 'Reset password');
}
//
async function sendEmail(
    output: string,
    recipient: string,
    subject: string,
    blindCopy = '',
    attach = [],
    setReplyTo = '',
) {
    let mailOptions = {
        from: '',
        to: `${recipient}`,
        bcc: `tkd.lsanchez@gmail.com, ${blindCopy}`,
        subject: `${subject}`,
        text: '',
        html: output,
    };
    //
    if (attach.length > 0) {
        mailOptions['attachments'] = attach;
    }
    // different reply to
    if (setReplyTo != '') {
        mailOptions['replyTo'] = setReplyTo;
    }
    //
    await mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    //
    console.log('New email was sent');
    return null;
}
