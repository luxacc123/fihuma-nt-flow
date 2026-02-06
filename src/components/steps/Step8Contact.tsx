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
    <StepWrapper stepKey={8} onBack={onBack}>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="text-gray-600 text-base leading-relaxed">
            <p>Wilt u isoleren met subsidie?</p>
            <p>Wij bekijken de mogelijkheden vrijblijvend met u</p>
            <p>en begeleiden u in het hele traject.</p>
          </div>
          <p className="text-brand-blue font-semibold text-base pt-2">
            Laat ons contact met u opnemen:
          </p>
        </div>

        <div className="space-y-4">
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

        <div className="space-y-3 pt-1">
          <Checkbox
            label="Ik geef toestemming om contact met mij op te nemen."
            checked={formData.consent_contact}
            onChange={(v) => updateField("consent_contact", v)}
            error={errors.consent_contact}
          />
          <Checkbox
            label="Ik ga akkoord met de privacyverklaring."
            checked={formData.consent_privacy}
            onChange={(v) => updateField("consent_privacy", v)}
            error={errors.consent_privacy}
          />
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
            {submitError}
          </div>
        )}

        <Button onClick={handleSubmit} loading={isSubmitting}>
          {isEmailPreferred
            ? "Verstuur & neem contact op per e-mail"
            : "Verstuur & laat mij terugbellen"}
        </Button>
      </div>
    </StepWrapper>
  );
}
