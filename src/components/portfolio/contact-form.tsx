"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Send } from "lucide-react";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";
import type { Locale, UiCopy } from "@/lib/portfolio-data";

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type ContactFormProps = {
  ui: UiCopy;
  locale: Locale;
};

export function ContactForm({ ui, locale }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "job",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setStatus({ kind: "success" });
      reset();
    } catch (error) {
      setStatus({ kind: "error", message: ui.formErrorServer });
    }
  });

  if (status.kind === "success") {
    return (
      <div className="form-success-card" role="status" aria-live="polite">
        <span className="form-success-icon">
          <Check size={22} />
        </span>
        <h3 className="form-success-title">{ui.formSuccessTitle}</h3>
        <p className="form-success-text">{ui.formSuccessText}</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setStatus({ kind: "idle" })}
        >
          {ui.formSuccessReset}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-label={ui.contactFormLabel}>
      {/* Honeypot — must stay empty */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="honeypot"
        {...register("website")}
      />

      <div className="field">
        <label htmlFor="contact-name" className="field-label">
          {ui.formName}
          <span className="req" aria-hidden>
            *
          </span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className="input"
          placeholder={ui.formNamePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="contact-name-error" className="field-error">
            {ui.formErrorName}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="contact-email" className="field-label">
          {ui.formEmail}
          <span className="req" aria-hidden>
            *
          </span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="input"
          placeholder={ui.formEmailPlaceholder}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="contact-email-error" className="field-error">
            {ui.formErrorEmail}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="contact-company" className="field-label">
          {ui.formCompany}
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          className="input"
          placeholder={ui.formCompanyPlaceholder}
          {...register("company")}
        />
      </div>

      <fieldset className="field">
        <legend className="field-label">
          {ui.formReason}
          <span className="req" aria-hidden>
            *
          </span>
        </legend>
        <div className="radio-group">
          {ui.reasons.map((reason) => (
            <label key={reason.value} className="radio-option">
              <input type="radio" value={reason.value} {...register("reason")} />
              {reason.label}
            </label>
          ))}
        </div>
        {errors.reason ? <p className="field-error">{ui.formErrorReason}</p> : null}
      </fieldset>

      <div className="field">
        <label htmlFor="contact-message" className="field-label">
          {ui.formMessage}
          <span className="req" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          className="textarea"
          placeholder={ui.formMessagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="field-error">
            {ui.formErrorMessage}
          </p>
        ) : null}
      </div>

      <div className="form-footer">
        {status.kind === "error" ? (
          <p className="form-error" role="alert">
            {status.message}
          </p>
        ) : null}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.kind === "submitting"}
          style={{ alignSelf: "flex-start" }}
        >
          {status.kind === "submitting" ? (
            ui.formSubmitting
          ) : (
            <>
              {ui.formSubmit}
              <Send size={14} />
            </>
          )}
        </button>
        <p className="form-disclaimer">{ui.formDisclaimer}</p>
      </div>
    </form>
  );
}
