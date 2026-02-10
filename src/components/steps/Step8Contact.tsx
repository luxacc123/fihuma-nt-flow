"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import TextInput from "@/components/ui/TextInput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

interface Step8Props extends StepProps {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
}

export default function Step8Contact({
  formData,
  updateField,
  onBack,
  isSubmitting,
  submitError,
  onSubmit,
}: Step8Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.contact_name || formData.contact_name.trim().length < 2) {
      newErrors.contact_name = "Vul uw naam in";
    }

    if (!formData.phone) {
      newErrors.phone = "Vul uw telefoonnummer in";
    } else {
      const phoneClean = formData.phone.replace(/[\s\-()]/g, "");
      if (!/^(\+31|0)[1-9]\d{7,8}$/.test(phoneClean)) {
        newErrors.phone = "Vul een geldig telefoonnummer in";
      }
    }

    if (formData.preferred_contact === "EMAIL") {
      if (!formData.email) {
        newErrors.email = "Vul uw e-mailadres in";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Vul een geldig e-mailadres in";
      }
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Vul een geldig e-mailadres in";
    }

    if (!formData.consent_contact) {
      newErrors.consent_contact = "Toestemming is vereist";
    }
    if (!formData.consent_privacy) {
      newErrors.consent_privacy = "Akkoord met de privacyverklaring is vereist";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  const isEmailPreferred = formData.preferred_contact === "EMAIL";

  return (
    <StepWrapper stepKey={9} onBack={onBack}>
      <div className="space-y-8">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-green bg-brand-green-light rounded-full px-3 py-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bijna klaar
          </div>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Na uw aanvraag nemen wij contact met u op om een inspectieafspraak in te plannen.
          </p>
          <p className="text-brand-blue font-semibold text-base pt-1">
            Laat ons contact met u opnemen:
          </p>
        </div>

        <div className="space-y-5">
          <TextInput
            label="Naam"
            value={formData.contact_name}
            onChange={(v) => updateField("contact_name", v)}
            autoComplete="name"
            error={errors.contact_name}
            required
          />

          <TextInput
            label="Telefoonnummer"
            value={formData.phone}
            onChange={(v) => updateField("phone", v)}
            type="tel"
            inputMode="tel"
            placeholder="06 12345678"
            autoComplete="tel"
            error={errors.phone}
            required
          />

          <TextInput
            label="E-mail"
            value={formData.email}
            onChange={(v) => updateField("email", v)}
            type="email"
            inputMode="email"
            placeholder="uw@email.nl"
            autoComplete="email"
            error={errors.email}
            required={isEmailPreferred}
          />
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Ik geef toestemming om contact met mij op te nemen."
            checked={formData.consent_contact}
            onChange={(v) => updateField("consent_contact", v)}
            error={errors.consent_contact}
          />
          <Checkbox
            label={
              <>
                Ik ga akkoord met de{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-brand-green hover:text-brand-green-hover"
                  onClick={(e) => e.stopPropagation()}
                >
                  privacyverklaring
                </a>
                .
              </>
            }
            checked={formData.consent_privacy}
            onChange={(v) => updateField("consent_privacy", v)}
            error={errors.consent_privacy}
          />
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-[13px] text-red-600 flex items-start gap-2.5">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            {submitError}
          </div>
        )}

        <Button onClick={handleSubmit} loading={isSubmitting}>
          Plan inspectie
        </Button>
      </div>
    </StepWrapper>
  );
}
