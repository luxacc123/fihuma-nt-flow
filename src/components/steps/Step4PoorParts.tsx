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
    <StepWrapper stepKey={6} onBack={onBack}>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight">
            Welke onderdelen zijn (mogelijk) slecht ge&iuml;soleerd?
          </h2>
          <p className="text-sm text-gray-400">
            Meerdere opties mogelijk
          </p>
        </div>

        <MultiSelect
          options={OPTIONS}
          selected={formData.poor_parts}
          onChange={(v) => {
            updateField("poor_parts", v);
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
