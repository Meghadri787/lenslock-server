import { transporter } from "../config/email.transporter.config.js";

const otpMailOptions = (user_email_id, otp) => ({
    from: {
        name: "LensLock",
        address: process.env.EMAIL_USER,
    },
    to: user_email_id,
    subject: "Your OTP for Password Reset",
    text: `Your OTP is: ${otp}`,
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
                .otp-code {
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 5px;
                    color: #02AABD;
                    margin: 20px 0;
                    padding: 10px;
                    background: #f0f0f0;
                    border-radius: 5px;
                    display: inline-block;
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
                    <h1>Password Reset OTP</h1>
                </div>
                <div class="message">
                    <p>Hello,</p>
                    <p>You have requested to reset your password. Please use the following OTP to verify your identity:</p>
                    <div class="otp-code">${otp}</div>
                    <p class="note">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                    <p>If you didn't request this OTP, please ignore this email or contact our support team immediately.</p>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} LensLock. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `,
});

export const sendOtpEmail = async (email, otp) => {
    try {
        console.log(
            `Attempting to send OTP email to ${email} using ${process.env.EMAIL_USER}`
        );

        // Verify the transporter configuration
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        // Send the email
        await transporter.sendMail(otpMailOptions(email, otp));
        // const info = await transporter.sendMail(otpMailOptions(email, otp));
        console.log(`📧 Successfully sent OTP email to ${email}`);
        // console.log(`Message ID: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
        // console.error("Error details:", {
        //     code: error.code,
        //     command: error.command,
        //     response: error.response,
        //     responseCode: error.responseCode,
        // });

        // Provide more helpful error messages
        // if (error.code === "EAUTH") {
        //     console.error(
        //         "Authentication failed. This is likely because Gmail requires an App Password."
        //     );
        //     console.error(
        //         "Please generate an App Password from your Google Account and update your .env file."
        //     );
        // }

        return false;
    }
};
