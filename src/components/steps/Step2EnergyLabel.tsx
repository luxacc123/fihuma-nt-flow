"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  { value: "AB", label: "A of B" },
  { value: "C", label: "C" },
  { value: "DEFG", label: "D, E, F of G" },
  { value: "NONE", label: "Geen geregistreerd energielabel" },
  { value: "UNKNOWN", label: "Weet ik niet" },
];

export default function Step2EnergyLabel({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.energy_label_choice) {
      setError("Maak een keuze om verder te gaan");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={2} onBack={onBack}>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-brand-blue tracking-tight">
          Wat is het energielabel van uw woning?
        </h2>

        <SingleSelect
          options={OPTIONS}
          selected={formData.energy_label_choice}
          onChange={(v) => {
            updateField("energy_label_choice", v);
            setError("");
          }}
        />

        {error && (
          <p className="text-[13px] text-red-500 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </p>
        )}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
