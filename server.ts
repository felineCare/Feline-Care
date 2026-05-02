import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";
import https from "https";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Status check for debugging (does not show actual secrets, just presence)
  app.get("/api/status", (req, res) => {
    res.json({
      email_pass_set: !!process.env.EMAIL_PASS,
      telegram_token_set: !!process.env.TELEGRAM_BOT_TOKEN,
      telegram_chat_id_set: !!process.env.TELEGRAM_CHAT_ID,
      node_version: process.version,
      env: process.env.NODE_ENV || 'development'
    });
  });

  app.get("/api/ping", (req, res) => {
    res.json({ status: "pong", time: new Date().toISOString() });
  });

  // API Route for Booking Notifications
  app.post("/api/book", async (req, res) => {
    const { ownerName, petName, catAge, ageUnit, gender, email, date, time, notes } = req.body;

    console.log("-----------------------------------------");
    console.log("📬 NEW BOOKING REQUEST RECEIVED");
    console.log(`👤 Owner: ${ownerName}`);
    console.log(`🐾 Cat: ${petName} (${gender}, ${catAge} ${ageUnit})`);
    console.log("-----------------------------------------");

    console.log("Environment check:");
    console.log("- EMAIL_PASS present:", !!process.env.EMAIL_PASS);
    console.log("- TELEGRAM_BOT_TOKEN present:", !!process.env.TELEGRAM_BOT_TOKEN);
    console.log("- TELEGRAM_CHAT_ID present:", !!process.env.TELEGRAM_CHAT_ID);

    // Diagnostic logging
    console.log("--- Notification Attempt ---");
    console.log("EMAIL_PASS set:", !!process.env.EMAIL_PASS);
    console.log("TG_TOKEN set:", !!process.env.TELEGRAM_BOT_TOKEN);
    console.log("TG_CHAT_ID set:", !!process.env.TELEGRAM_CHAT_ID);
    
    try {
      let emailSent = false;
      let telegramSent = false;
      let emailError = null;
      let telegramError = null;

      // 1. Email Notification
      if (process.env.EMAIL_PASS) {
        console.log("📧 Attempting to send email via Gmail...");
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'abdullah.researcher99@gmail.com',
              pass: process.env.EMAIL_PASS
            }
          });

          const mailOptions = {
            from: '"Feline Care" <abdullah.researcher99@gmail.com>',
            to: 'abdullah.researcher99@gmail.com',
            subject: `🐾 New Consultation Request: ${petName}`,
            text: `
              New booking request details:
              
              Owner Name: ${ownerName}
              Cat's Name: ${petName}
              Age: ${catAge} ${ageUnit}
              Gender: ${gender}
              Email: ${email || 'Not provided'}
              Date: ${date}
              Time: ${time}
              
              Reason for Visit:
              ${notes || 'No extra notes provided.'}
            `
          };

          await transporter.sendMail(mailOptions);
          console.log("✅ Email sent successfully");
          emailSent = true;
        } catch (e: any) {
          console.error("❌ Email failed:", e);
          emailError = e.message;
        }
      }

      // 2. Telegram Notification
      if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
        console.log("🚀 Attempting to send Telegram message...");
        try {
          const token = process.env.TELEGRAM_BOT_TOKEN;
          const chatId = process.env.TELEGRAM_CHAT_ID;
          const text = `🚀 *New Consultation Request*\n\n` +
            `*Owner:* ${ownerName}\n` +
            `*Cat:* ${petName}\n` +
            `*Age:* ${catAge} ${ageUnit}\n` +
            `*Gender:* ${gender}\n` +
            `*Email:* ${email || 'N/A'}\n` +
            `*Date:* ${date}\n` +
            `*Time:* ${time}\n\n` +
            `*Reason:* ${notes || 'None'}`;

          const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'Markdown'
            })
          });

          if (tgResponse.ok) {
            console.log("✅ Telegram notification sent successfully");
            telegramSent = true;
          } else {
            const errText = await tgResponse.text();
            if (tgResponse.status === 401) {
              console.error(`❌ Telegram Error: 401 Unauthorized. Your TELEGRAM_BOT_TOKEN is invalid.`);
              telegramError = "Invalid Bot Token (401). Please check AI Studio Secrets.";
            } else {
              console.error(`❌ Telegram Error (Status ${tgResponse.status}): ${errText}`);
              telegramError = `Status ${tgResponse.status}: ${errText}`;
            }
          }
        } catch (e: any) {
          console.error("❌ Telegram processing failed:", e);
          telegramError = e.message;
        }
      }

      const warnings = [];
      if (!emailSent && process.env.EMAIL_PASS) warnings.push(`Email failed: ${emailError}`);
      if (!emailSent && !process.env.EMAIL_PASS) warnings.push("EMAIL_PASS secret is missing.");
      if (!telegramSent && (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)) warnings.push(`Telegram failed: ${telegramError}`);
      if (!telegramSent && !(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID)) warnings.push("Telegram secrets (TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID) are missing.");

      res.status(200).json({ 
        success: true, 
        emailSent, 
        telegramSent,
        warnings: warnings.length > 0 ? warnings.join(" | ") : null
      });
    } catch (error: any) {
      console.error("🛑 CRITICAL Error processing booking:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
