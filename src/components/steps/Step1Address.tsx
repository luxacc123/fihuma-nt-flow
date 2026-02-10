"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const WOONSITUATIE_OPTIONS = [
  { value: "KOOP", label: "Koopwoning" },
  { value: "HUUR", label: "Huurwoning" },
];

export default function Step1Address({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.housing_situation) {
      newErrors.housing_situation = "Maak een keuze om verder te gaan";
    }

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
      const normalized = formData.postcode.replace(/\s/g, "").toUpperCase();
      updateField("postcode", normalized);
      onNext();
    }
  };

  return (
    <StepWrapper stepKey={1} onBack={onBack}>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight">
            Uw woning
          </h2>
          <p className="text-sm text-gray-400">
            Woonsituatie en adresgegevens
          </p>
        </div>

        <div className="space-y-2">
          <SingleSelect
            options={WOONSITUATIE_OPTIONS}
            selected={formData.housing_situation}
            onChange={(v) => {
              updateField("housing_situation", v);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.housing_situation;
                return next;
              });
            }}
          />
          {errors.housing_situation && (
            <p className="text-[13px] text-red-500 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {errors.housing_situation}
            </p>
          )}
        </div>

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
