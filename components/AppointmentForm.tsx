"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormState = {
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  contactMethod: string;
  voicemail: string;
  services: string[];
  otherService: string;
  helpDescription: string;
  insurance: string;
  primaryPolicyholder: string;
  policyholderInfo: string;
  privatePayInfo: string;
  preferredTimes: string;
  appointmentState: string;
  consentContact: boolean;
  consentAccuracy: boolean;
};

const initialState: FormState = {
  fullName: "",
  dob: "",
  phone: "",
  email: "",
  contactMethod: "",
  voicemail: "",
  services: [],
  otherService: "",
  helpDescription: "",
  insurance: "",
  primaryPolicyholder: "",
  policyholderInfo: "",
  privatePayInfo: "",
  preferredTimes: "",
  appointmentState: "",
  consentContact: false,
  consentAccuracy: false,
};

function ChoiceChip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className={`choice-chip${checked ? " is-selected" : ""}`} data-type={type}>
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span className="choice-indicator" aria-hidden="true" />
      <span className="choice-chip-text">{children}</span>
    </label>
  );
}

export function AppointmentForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  const showOther = form.services.includes("other");
  const showPolicyholder = form.primaryPolicyholder === "no";

  function toggleService(value: string) {
    setForm((prev) => {
      const exists = prev.services.includes(value);
      const services = exists ? prev.services.filter((s) => s !== value) : [...prev.services, value];
      return {
        ...prev,
        services,
        otherService: services.includes("other") ? prev.otherService : "",
      };
    });
  }

  function validate(): boolean {
    const nextInvalid: Record<string, boolean> = {};
    const required: (keyof FormState)[] = [
      "fullName",
      "dob",
      "phone",
      "email",
      "insurance",
      "appointmentState",
    ];
    for (const key of required) {
      if (!String(form[key] || "").trim()) nextInvalid[key] = true;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextInvalid.email = true;
      setInvalid(nextInvalid);
      setError("Please enter a valid email address.");
      return false;
    }
    if (!form.contactMethod) {
      setError("Please select a preferred method of contact.");
      return false;
    }
    if (!form.voicemail) {
      setError("Please tell us whether we may leave a voicemail.");
      return false;
    }
    if (!form.services.length) {
      setError("Please select at least one service.");
      return false;
    }
    if (showOther && !form.otherService.trim()) {
      nextInvalid.otherService = true;
      setInvalid(nextInvalid);
      setError("Please specify the other service you are seeking.");
      return false;
    }
    if (!form.primaryPolicyholder) {
      setError("Please indicate whether you are the primary policyholder.");
      return false;
    }
    if (showPolicyholder && !form.policyholderInfo.trim()) {
      nextInvalid.policyholderInfo = true;
      setInvalid(nextInvalid);
      setError("Please enter the policyholder name and relationship.");
      return false;
    }
    if (!form.consentContact || !form.consentAccuracy) {
      setError("Please confirm both consent statements before submitting.");
      return false;
    }
    if (Object.keys(nextInvalid).length) {
      setInvalid(nextInvalid);
      setError("Please complete all required fields.");
      return false;
    }
    setInvalid({});
    setError("");
    return true;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          source: "teleemon-request-appointment",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status}).`);
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-success visible" role="status">
        <h2 className="mb-3 text-2xl font-semibold text-teleemon-purple-800">Thank you</h2>
        <p className="body-text">
          Your appointment request has been sent. A Teleemon team member will follow up using the
          contact details you provided.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={`form-error-banner${error ? " visible" : ""}`} role="alert">
        {error}
      </div>

      <form className="appointment-form" onSubmit={onSubmit} noValidate>
        <section className="form-section">
          <h2>Contact Information</h2>
          <p className="form-section-hint">How should we reach you?</p>
          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="fullName">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                className={invalid.fullName ? "is-invalid" : ""}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                autoComplete="name"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="dob">
                Date of Birth <span className="req">*</span>
              </label>
              <input
                id="dob"
                type="text"
                inputMode="numeric"
                placeholder="mm/dd/yyyy"
                className={invalid.dob ? "is-invalid" : ""}
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                autoComplete="bday"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">
                Callback Number <span className="req">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                className={invalid.phone ? "is-invalid" : ""}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="(425) 555-0100"
                autoComplete="tel"
                required
              />
            </div>
            <div className="form-field full">
              <label htmlFor="email">
                Email Address <span className="req">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={invalid.email ? "is-invalid" : ""}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-field full">
              <label id="contact-method-label">
                Preferred Method of Contact <span className="req">*</span>
              </label>
              <div className="choice-group choice-row" role="radiogroup" aria-labelledby="contact-method-label">
                {[
                  ["telephone", "Telephone call"],
                  ["text", "Text message"],
                  ["email", "Email"],
                ].map(([value, label]) => (
                  <ChoiceChip
                    key={value}
                    type="radio"
                    name="contactMethod"
                    value={value}
                    checked={form.contactMethod === value}
                    onChange={() => setForm({ ...form, contactMethod: value })}
                  >
                    {label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
            <div className="form-field full">
              <label id="voicemail-label">
                May we leave a voicemail identifying Teleemon Behavioral Health &amp; Wellness?{" "}
                <span className="req">*</span>
              </label>
              <div className="choice-group choice-binary" role="radiogroup" aria-labelledby="voicemail-label">
                {[
                  ["yes", "Yes"],
                  ["no", "No"],
                ].map(([value, label]) => (
                  <ChoiceChip
                    key={value}
                    type="radio"
                    name="voicemail"
                    value={value}
                    checked={form.voicemail === value}
                    onChange={() => setForm({ ...form, voicemail: value })}
                  >
                    {label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Services Requested</h2>
          <p className="form-section-hint">
            What type of service are you seeking? Select all that apply. <span className="req">*</span>
          </p>
          <div className="choice-group service-chips">
            {[
              ["initial-evaluation", "Initial psychiatric evaluation"],
              ["medication-management", "Medication management"],
              ["therapy", "Therapy"],
              ["adhd", "ADHD evaluation or treatment"],
              ["anxiety-depression", "Anxiety or depression treatment"],
              ["other", "Other"],
            ].map(([value, label]) => (
              <ChoiceChip
                key={value}
                type="checkbox"
                name="services"
                value={value}
                checked={form.services.includes(value)}
                onChange={() => toggleService(value)}
              >
                {label}
              </ChoiceChip>
            ))}
          </div>
          {showOther && (
            <div className="form-field full mt-4">
              <label htmlFor="otherService">
                Please specify <span className="req">*</span>
              </label>
              <input
                id="otherService"
                type="text"
                className={invalid.otherService ? "is-invalid" : ""}
                value={form.otherService}
                onChange={(e) => setForm({ ...form, otherService: e.target.value })}
              />
            </div>
          )}
          <div className="form-field full mt-4">
            <label htmlFor="helpDescription">
              Please briefly describe how we may help you <span className="optional">(optional)</span>
            </label>
            <textarea
              id="helpDescription"
              maxLength={1000}
              value={form.helpDescription}
              onChange={(e) => setForm({ ...form, helpDescription: e.target.value })}
              placeholder="Share a short overview of what you are looking for."
            />
          </div>
          <p className="privacy-note">
            Please do not include highly sensitive medical information, detailed symptoms, Social
            Security numbers, or financial information in this form.
          </p>
        </section>

        <section className="form-section">
          <h2>Insurance Information</h2>
          <p className="form-section-hint">Help us understand how you plan to cover care.</p>
          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="insurance">
                Insurance Company <span className="req">*</span>
              </label>
              <input
                id="insurance"
                type="text"
                className={invalid.insurance ? "is-invalid" : ""}
                value={form.insurance}
                onChange={(e) => setForm({ ...form, insurance: e.target.value })}
                placeholder="e.g. Premera, Aetna, Regence"
                autoComplete="organization"
                required
              />
            </div>
            <div className="form-field full">
              <label id="policyholder-label">
                Are you the primary policyholder? <span className="req">*</span>
              </label>
              <div className="choice-group choice-binary" role="radiogroup" aria-labelledby="policyholder-label">
                {[
                  ["yes", "Yes"],
                  ["no", "No"],
                ].map(([value, label]) => (
                  <ChoiceChip
                    key={value}
                    type="radio"
                    name="primaryPolicyholder"
                    value={value}
                    checked={form.primaryPolicyholder === value}
                    onChange={() =>
                      setForm({
                        ...form,
                        primaryPolicyholder: value,
                        policyholderInfo: value === "yes" ? "" : form.policyholderInfo,
                      })
                    }
                  >
                    {label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
            {showPolicyholder && (
              <div className="form-field full">
                <label htmlFor="policyholderInfo">
                  Policyholder full name and relationship to you <span className="req">*</span>
                </label>
                <input
                  id="policyholderInfo"
                  type="text"
                  className={invalid.policyholderInfo ? "is-invalid" : ""}
                  value={form.policyholderInfo}
                  onChange={(e) => setForm({ ...form, policyholderInfo: e.target.value })}
                  placeholder="e.g. Jane Doe — spouse"
                />
              </div>
            )}
            <div className="form-field full">
              <label id="private-pay-label">
                Would you like information about private-pay services if your insurance is not
                accepted?
              </label>
              <div className="choice-group choice-binary" role="radiogroup" aria-labelledby="private-pay-label">
                {[
                  ["yes", "Yes"],
                  ["no", "No"],
                ].map(([value, label]) => (
                  <ChoiceChip
                    key={value}
                    type="radio"
                    name="privatePayInfo"
                    value={value}
                    checked={form.privatePayInfo === value}
                    onChange={() => setForm({ ...form, privatePayInfo: value })}
                  >
                    {label}
                  </ChoiceChip>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Appointment Preferences</h2>
          <p className="form-section-hint">Tell us what works best for your schedule and location.</p>
          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="preferredTimes">
                Preferred appointment days or times <span className="optional">(optional)</span>
              </label>
              <textarea
                id="preferredTimes"
                maxLength={500}
                value={form.preferredTimes}
                onChange={(e) => setForm({ ...form, preferredTimes: e.target.value })}
                placeholder="e.g. Weekday mornings, Tuesday/Thursday after 4pm"
              />
            </div>
            <div className="form-field full">
              <label htmlFor="appointmentState">
                State where you will be physically located during the appointment{" "}
                <span className="req">*</span>
              </label>
              <input
                id="appointmentState"
                type="text"
                className={invalid.appointmentState ? "is-invalid" : ""}
                value={form.appointmentState}
                onChange={(e) => setForm({ ...form, appointmentState: e.target.value })}
                placeholder="e.g. Washington"
                autoComplete="address-level1"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Consent</h2>
          <p className="form-section-hint">
            Please review and confirm both statements. <span className="req">*</span>
          </p>
          <div className="consent-list">
            <label className="consent-item">
              <input
                type="checkbox"
                checked={form.consentContact}
                onChange={(e) => setForm({ ...form, consentContact: e.target.checked })}
                required
              />
              <span>
                I understand that submitting this form does not establish a provider-patient
                relationship or guarantee an appointment. I authorize Teleemon Behavioral Health
                &amp; Wellness to contact me using the information provided. Standard telephone,
                text-message, or email risks and charges may apply.
              </span>
            </label>
            <label className="consent-item">
              <input
                type="checkbox"
                checked={form.consentAccuracy}
                onChange={(e) => setForm({ ...form, consentAccuracy: e.target.checked })}
                required
              />
              <span>
                I confirm that the information provided is accurate and that I am not using this form
                for an urgent or emergency situation.
              </span>
            </label>
          </div>
        </section>

        <div className="form-actions">
          <p className="text-sm text-teleemon-purple-600">Required fields are marked with *</p>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Sending…" : "Submit Request"}
          </button>
        </div>
      </form>
    </>
  );
}
