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
  { value: "none", label: "Niets / weet ik niet" },
];

export default function Step5AlreadyInsulated({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (formData.already_insulated_parts.length === 0) {
      setError("Selecteer minimaal één optie");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={5} onBack={onBack}>
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
          Is er al iets ge&iuml;soleerd (voor zover u weet)?
        </h2>

        <MultiSelect
          options={OPTIONS}
          selected={formData.already_insulated_parts}
          onChange={(v) => {
            updateField("already_insulated_parts", v);
            setError("");
          }}
          exclusiveValue="none"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
