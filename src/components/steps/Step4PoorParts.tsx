"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import MultiSelect from "@/components/ui/MultiSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  { value: "vloer", label: "Vloer / kruipruimte" },
  { value: "spouw", label: "Gevel / spouwmuur" },
  { value: "dak", label: "Dak / zolder" },
  { value: "ramen", label: "Ramen / kozijnen" },
  { value: "onbekend", label: "Weet ik niet" },
];

export default function Step4PoorParts({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (formData.poor_parts.length === 0) {
      setError("Selecteer minimaal één optie");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={4} onBack={onBack}>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
          Welke onderdelen zijn (mogelijk) slecht ge&iuml;soleerd?
        </h2>

        <MultiSelect
          options={OPTIONS}
          selected={formData.poor_parts}
          onChange={(v) => {
            updateField("poor_parts", v);
            setError("");
          }}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
