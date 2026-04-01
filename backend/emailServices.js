const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVoteEmail = async (toEmail, userName) => {
    try {
        await transporter.sendMail({
            from: `"Voting App" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: "Vote Confirmation 🗳️",
            html: `
                <h2>Thank you for voting, ${userName}!</h2>
                <p>Your vote has been successfully recorded.</p>
                <p>🇮🇳 e-Voting System</p>
            `
        });

        console.log("✅ Email sent successfully");
    } catch (err) {
        console.error("❌ Email error:", err);
    }
};

module.exports = sendVoteEmail;