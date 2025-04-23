import { transporter } from "../config/email.transporter.config.js";

// Register Email Options
const registerMailOptions = (user_email_id, user_name) => ({
    from: {
        name: "LensLock",
        address: process.env.EMAIL_USER,
    },
    to: user_email_id,
    subject: "Welcome to LensLock!",
    text: `Hello ${user_name}, welcome to LensLock! We are excited to have you onboard.`,
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
                .note {
                    font-size: 14px;
                    color: #666;
                    margin-top: 20px;
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
                    <h1>Welcome to LensLock!</h1>
                </div>
                <div class="message">
                    <p>Hi ${user_name},</p>
                    <p>Thank you for registering with LensLock. We're excited to have you as part of our community!</p>
                    <p>Explore, create, and enjoy the experience. If you have any questions, feel free to reach out to our support team.</p>
                    <p class="note">Stay connected. Stay inspired!</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} LensLock. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `,
});

// Send Register Email
export const sendRegisterEmail = async (email, name) => {
    try {
        console.log(
            `Attempting to send Welcome email to ${email} using ${process.env.EMAIL_USER}`
        );

        // Verify the transporter configuration
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        // Send the email
        await transporter.sendMail(registerMailOptions(email, name));
        console.log(`📧 Successfully sent Welcome email to ${email}`);
        return true;
    } catch (error) {
        console.error("❌ Error sending Welcome email:", error);
        return false;
    }
};
