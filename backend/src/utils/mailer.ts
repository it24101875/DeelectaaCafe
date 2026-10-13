import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const escapeHtml = (value: string) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

const createTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    if (process.env.NODE_ENV === "production")
      throw new Error("Email delivery is not configured.");
    // Fallback to test account
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("\n--- EMAIL SYSTEM ---");
    console.log("No EMAIL_USER found in .env.");
    console.log("Using Ethereal (fake email service) for testing.");
    console.log("--------------------\n");
  }
};

export const sendReservationEmail = async (
  to: string,
  name: string,
  date: string,
  time: string,
  status: "pending" | "confirmed" | "rejected",
) => {
  if (!transporter) await createTransporter();

  let subject = "";
  let text = "";
  let html = "";

  const dateStr = new Date(date).toLocaleDateString("en-GB", {timeZone:"Asia/Colombo"});

  if (status === "pending") {
    subject = "Your Reservation Request is Pending - Deelectaa Cafe";
    text = `Hi ${name},\n\nWe have received your reservation request for ${dateStr} at ${time}. Your request is currently pending admin approval.\n\nWe will send you another email once it is confirmed.\n\nThanks,\nDeelectaa Cafe`;
    html = `<p>Hi <strong>${escapeHtml(name)}</strong>,</p><p>We have received your reservation request for <strong>${dateStr}</strong> at <strong>${time}</strong>. Your request is currently <em>pending admin approval</em>.</p><p>We will send you another email once it is confirmed.</p><p>Thanks,<br/>Deelectaa Cafe</p>`;
  } else if (status === "confirmed") {
    subject = "Your Reservation is Confirmed! - Deelectaa Cafe";
    text = `Hi ${name},\n\nGreat news! Your reservation for ${dateStr} at ${time} has been confirmed.\n\nPlease arrive on time. We look forward to seeing you!\n\nThanks,\nDeelectaa Cafe`;
    html = `<p>Hi <strong>${escapeHtml(name)}</strong>,</p><p>Great news! Your reservation for <strong>${dateStr}</strong> at <strong>${time}</strong> has been <strong>confirmed</strong>.</p><p>Please arrive on time. We look forward to seeing you!</p><p>Thanks,<br/>Deelectaa Cafe</p>`;
  } else if (status === "rejected") {
    subject = "Reservation Update - Deelectaa Cafe";
    text = `Hi ${name},\n\nWe're sorry, but we cannot accommodate your reservation request for ${dateStr} at ${time} at this time. Our tables are fully booked.\n\nPlease try another time!\n\nThanks,\nDeelectaa Cafe`;
    html = `<p>Hi <strong>${escapeHtml(name)}</strong>,</p><p>We're sorry, but we cannot accommodate your reservation request for <strong>${dateStr}</strong> at <strong>${time}</strong> at this time. Our tables are fully booked.</p><p>Please try another time!</p><p>Thanks,<br/>Deelectaa Cafe</p>`;
  }

  try {
    const info = await transporter!.sendMail({
      from: {name:"Déelectaa Café", address:process.env.EMAIL_USER || "deelectaacafe@gmail.com"},
      to,
      subject,
      text,
      html,
    });

    if (!process.env.EMAIL_USER) {
      console.log(
        "\n✉️  PREVIEW TEST EMAIL URL: %s",
        nodemailer.getTestMessageUrl(info),
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendContactEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  message: string,
) => {
  if (!transporter) await createTransporter();

  const to = process.env.EMAIL_USER || "deelectaacafe@gmail.com"; // Send to the cafe's own email

  const subject = `New Contact Form Submission from ${firstName} ${lastName}`;
  const text = `You have received a new message from the website contact form.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
      ${escapeHtml(message).replace(/\n/g, "<br>")}
    </blockquote>
  `;

  try {
    const info = await transporter!.sendMail({
      from: {name:"Déelectaa Café", address:process.env.EMAIL_USER || "deelectaacafe@gmail.com"},
      replyTo: email,
      to,
      subject,
      text,
      html,
    });

    if (!process.env.EMAIL_USER) {
      console.log(
        "\n✉️  PREVIEW CONTACT EMAIL URL: %s",
        nodemailer.getTestMessageUrl(info),
      );
    }
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};
