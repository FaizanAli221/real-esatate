// api/inquiries.js
// POST /api/inquiries
// Body: { name, email, phone, propertyId, preferredDate, message }

const { withCors } = require("./_lib/cors");
const { createInquiry, getPropertyById } = require("./_lib/data");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

function validate(body) {
  const errors = [];
  const { name, email, phone, propertyId, preferredDate } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required and must be at least 2 characters.");
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.push("A valid email is required.");
  }
  if (!phone || !PHONE_RE.test(phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!propertyId || typeof propertyId !== "string") {
    errors.push("propertyId is required.");
  } else if (!getPropertyById(propertyId)) {
    errors.push(`No property found with id "${propertyId}".`);
  }
  if (preferredDate && Number.isNaN(Date.parse(preferredDate))) {
    errors.push("preferredDate must be a valid date (e.g. 2026-02-14).");
  }

  return errors;
}

async function handler(req, res) {
  const body = req.body || {};
  const errors = validate(body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: "Validation failed.", details: errors });
  }

  const { name, email, phone, propertyId, preferredDate, message } = body;

  const inquiry = {
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    propertyId,
    preferredDate: preferredDate || null,
    message: message ? String(message).trim() : "",
    status: "received",
    submittedAt: new Date().toISOString(),
  };

  createInquiry(inquiry);

  return res.status(201).json({
    success: true,
    message: "Thanks! Your inquiry has been received — our team will reach out shortly.",
    data: inquiry,
  });
}

module.exports = withCors(handler, ["POST"]);
