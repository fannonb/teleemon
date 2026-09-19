import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  fullName?: string;
  dob?: string;
  phone?: string;
  email?: string;
  contactMethod?: string;
  voicemail?: string;
  services?: string[];
  otherService?: string;
  helpDescription?: string;
  insurance?: string;
  primaryPolicyholder?: string;
  policyholderInfo?: string;
  privatePayInfo?: string;
  preferredTimes?: string;
  appointmentState?: string;
  consentContact?: boolean;
  consentAccuracy?: boolean;
  submittedAt?: string;
};

function str(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n\0]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Payload;

    const fullName = str(data.fullName, 200);
    const dob = str(data.dob, 32);
    const phone = str(data.phone, 40);
    const email = str(data.email, 200);
    const contactMethod = str(data.contactMethod, 40);
    const voicemail = str(data.voicemail, 10);
    const insurance = str(data.insurance, 200);
    const primaryPolicyholder = str(data.primaryPolicyholder, 10);
    const policyholderInfo = str(data.policyholderInfo, 300);
    const privatePayInfo = str(data.privatePayInfo, 10);
    const preferredTimes = str(data.preferredTimes, 1000);
    const appointmentState = str(data.appointmentState, 100);
    const otherService = str(data.otherService, 300);
    const helpDescription = str(data.helpDescription, 2000);
    const submittedAt = str(data.submittedAt, 64) || new Date().toISOString();
    const services = Array.isArray(data.services)
      ? data.services.filter((s): s is string => typeof s === "string").map((s) => s.slice(0, 80))
      : [];

    const missing: string[] = [];
    for (const [key, value] of Object.entries({
      fullName,
      dob,
      phone,
      email,
      contactMethod,
      voicemail,
      insurance,
      primaryPolicyholder,
      appointmentState,
    })) {
      if (!value) missing.push(key);
    }
    if (!services.length) missing.push("services");
    if (primaryPolicyholder === "no" && !policyholderInfo) missing.push("policyholderInfo");
    if (services.includes("other") && !otherService) missing.push("otherService");
    if (!data.consentContact || !data.consentAccuracy) missing.push("consent");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing or invalid fields: ${missing.join(", ")}` },
        { status: 422 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 422 });
    }

    const host = process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.MAIL_TO || "info@teleemon.com";
    const from = process.env.MAIL_FROM || user || to;

    if (!user || !pass) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email is not configured. Set SMTP_USER and SMTP_PASS in .env.local (Hostinger mailbox).",
        },
        { status: 500 },
      );
    }

    const labels: Record<string, string> = {
      telephone: "Telephone call",
      text: "Text message",
      email: "Email",
      yes: "Yes",
      no: "No",
      "initial-evaluation": "Initial psychiatric evaluation",
      "medication-management": "Medication management",
      therapy: "Therapy",
      adhd: "ADHD evaluation or treatment",
      "anxiety-depression": "Anxiety or depression treatment",
      other: "Other",
    };

    const serviceLines = services.map((s) => {
      const label = labels[s] || s;
      return s === "other" && otherService ? `${label} (${otherService})` : label;
    });

    const rows: [string, string][] = [
      ["Full name", fullName],
      ["Date of birth", dob],
      ["Callback number", phone],
      ["Email", email],
      ["Preferred contact", labels[contactMethod] || contactMethod],
      ["Voicemail OK", labels[voicemail] || voicemail],
      ["Services requested", serviceLines.join(", ")],
      ["How we may help", helpDescription || "—"],
      ["Insurance company", insurance],
      ["Primary policyholder", labels[primaryPolicyholder] || primaryPolicyholder],
      ["Policyholder details", policyholderInfo || "—"],
      ["Private-pay info requested", privatePayInfo ? labels[privatePayInfo] || privatePayInfo : "—"],
      ["Preferred days/times", preferredTimes || "—"],
      ["State during appointment", appointmentState],
      ["Submitted at", submittedAt],
    ];

    const plain = ["New appointment request from teleemon.com", "-".repeat(42)]
      .concat(rows.map(([k, v]) => `${k}: ${v}`))
      .join("\n");

    const html = `
      <h2 style="color:#3b288f;font-family:Arial,sans-serif;">New appointment request</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1e144d;">
        ${rows
          .map(
            ([k, v]) => `<tr>
            <td style="border:1px solid #d8cdf8;background:#f6f2ff;font-weight:bold;vertical-align:top;">${escapeHtml(k)}</td>
            <td style="border:1px solid #d8cdf8;vertical-align:top;">${escapeHtml(v).replace(/\n/g, "<br/>")}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#6652a8;margin-top:16px;">
        Submitted via the website appointment request form. This does not establish a provider-patient relationship.
      </p>
    `;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Teleemon Website" <${from}>`,
      to,
      replyTo: `"${cleanHeader(fullName)}" <${email}>`,
      subject: `Appointment request: ${cleanHeader(fullName)}`,
      text: plain,
      html,
    });

    return NextResponse.json({ ok: true, message: "Appointment request sent." });
  } catch (error) {
    console.error("Appointment form mail error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send your request right now. Please call the office or email info@teleemon.com.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
