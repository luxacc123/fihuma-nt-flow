"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

export default function Step1Address({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const postcodeClean = formData.postcode.replace(/\s/g, "").toUpperCase();
    if (!postcodeClean) {
      newErrors.postcode = "Vul uw postcode in";
    } else if (!/^\d{4}[A-Z]{2}$/.test(postcodeClean)) {
      newErrors.postcode = "Vul een geldige postcode in (bijv. 1234AB)";
    }

    if (!formData.house_number) {
      newErrors.house_number = "Vul uw huisnummer in";
    } else if (!/^\d+$/.test(formData.house_number)) {
      newErrors.house_number = "Vul alleen cijfers in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      // Normalize postcode before advancing
      const normalized = formData.postcode.replace(/\s/g, "").toUpperCase();
      updateField("postcode", normalized);
      onNext();
    }
  };

  return (
    <StepWrapper stepKey={1} onBack={onBack}>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">Uw adres</h2>

        <TextInput
          label="Postcode"
          value={formData.postcode}
          onChange={(v) => updateField("postcode", v.toUpperCase())}
          placeholder="1234AB"
          maxLength={7}
          autoComplete="postal-code"
          error={errors.postcode}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Huisnummer"
            value={formData.house_number}
            onChange={(v) => updateField("house_number", v)}
            inputMode="numeric"
            placeholder="12"
            error={errors.house_number}
            required
          />
          <TextInput
            label="Toevoeging"
            value={formData.house_number_addition}
            onChange={(v) => updateField("house_number_addition", v)}
            placeholder="A, bis, etc."
          />
        </div>

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
