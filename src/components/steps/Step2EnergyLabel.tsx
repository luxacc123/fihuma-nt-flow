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
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
