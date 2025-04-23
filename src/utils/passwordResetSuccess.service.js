import { transporter } from "../config/email.transporter.config.js";

// Password Reset Success Email Options
const passwordResetSuccessMailOptions = (user_email_id, user_name) => ({
    from: {
        name: "LensLock",
        address: process.env.EMAIL_USER,
    },
    to: user_email_id,
    subject: "Your Password Has Been Reset Successfully",
    text: `Hello ${user_name}, your password has been reset successfully. If this wasn't you, please contact our support immediately.`,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9fafc;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #02AABD, #00CDAC);
                    padding: 30px;
                    border-radius: 8px 8px 0 0;
                    color: white;
                }
                .header h1 {
                    font-size: 28px;
                    margin: 0;
                }
                .message {
                    padding: 20px;
                    text-align: center;
                    color: #333333;
                }
                .message p {
                    margin: 0 0 15px;
                    line-height: 1.6;
                }
                .success-icon {
                    font-size: 50px;
                    color: #00CDAC;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 12px;
                    color: #aaaaaa;
                    margin-top: 20px;
                    padding-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Password Reset Successful</h1>
                </div>
                <div class="message">
                    <div class="success-icon">✅</div>
                    <p>Hi ${user_name},</p>
                    <p>Your password has been successfully reset.</p>
                    <p>If you did not request this change, please contact our support team immediately.</p>
                    <p class="note">Stay safe and secure with LensLock!</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} LensLock. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `,
});

// Send Password Reset Success Email
export const sendPasswordResetSuccessEmail = async (email, name) => {
    try {
        console.log(
            `Attempting to send Password Reset Success email to ${email} using ${process.env.EMAIL_USER}`
        );

        // Verify the transporter configuration
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        // Send the email
        await transporter.sendMail(
            passwordResetSuccessMailOptions(email, name)
        );
        console.log(
            `📧 Successfully sent Password Reset Success email to ${email}`
        );
        return true;
    } catch (error) {
        console.error("❌ Error sending Password Reset Success email:", error);
        return false;
    }
};
