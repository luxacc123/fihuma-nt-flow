"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import MultiSelect from "@/components/ui/MultiSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  {
    value: "vloer",
    label: "Vloer / bodem",
    icon: (
      /* Layers icon — stacked horizontal planes */
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 2 10 6.5v7L12 22 2 15.5v-7L12 2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 15.5 12 9l10 6.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m2 8.5 10 6.5 10-6.5" />
      </svg>
    ),
  },
  {
    value: "spouw",
    label: "Gevel / spouwmuur",
    icon: (
      /* BrickWall icon — rows of offset bricks */
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" />
      </svg>
    ),
  },
  {
    value: "dak",
    label: "Dak / zolder",
    icon: (
      /* Roof icon — pitched roof with chimney */
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18L12 6 3 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 10V7h-2v1" />
      </svg>
    ),
  },
  {
    value: "ramen",
    label: "Ramen / kozijnen",
    icon: (
      /* Window icon — four-pane window */
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M12 4v16M2 12h20" />
      </svg>
    ),
  },
  {
    value: "onbekend",
    label: "Weet ik niet",
    icon: (
      /* HelpCircle icon */
      <svg className="w-5 h-5 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path strokeLinecap="round" d="M12 17h.01" />
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
            Meerdere opties mogelijk — kies alles wat mogelijk van toepassing is
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
