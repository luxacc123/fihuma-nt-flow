"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import MultiSelect from "@/components/ui/MultiSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  {
    value: "vloer",
    label: "Vloer / kruipruimte",
    icon: (
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 21V6.75L12 3l8.25 3.75V21M6 21v-3.75h4.5V21M13.5 21v-3.75H18V21" />
      </svg>
    ),
  },
  {
    value: "spouw",
    label: "Gevel / spouwmuur",
    icon: (
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 6.75v10.5M3.75 17.25h16.5M3.75 6.75v10.5M20.25 6.75v10.5" />
      </svg>
    ),
  },
  {
    value: "dak",
    label: "Dak / zolder",
    icon: (
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21L12 3l9.75 18M5.25 21h13.5" />
      </svg>
    ),
  },
  {
    value: "ramen",
    label: "Ramen / kozijnen",
    icon: (
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18v15H3zM12 4.5v15M3 12h18" />
      </svg>
    ),
  },
  {
    value: "onbekend",
    label: "Weet ik niet",
    icon: (
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
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
