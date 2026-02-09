"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  { value: "KOOP", label: "Koopwoning" },
  { value: "HUUR", label: "Huurwoning" },
];

export default function Step4Woonsituatie({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.housing_situation) {
      setError("Maak een keuze om verder te gaan");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={4} onBack={onBack}>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
          Wat is uw woonsituatie?
        </h2>

        <SingleSelect
          options={OPTIONS}
          selected={formData.housing_situation}
          onChange={(v) => {
            updateField("housing_situation", v);
            setError("");
          }}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
