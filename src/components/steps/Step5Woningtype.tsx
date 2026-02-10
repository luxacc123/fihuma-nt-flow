"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import Button from "@/components/ui/Button";

{/* Rijtjeswoning: 3 connected houses, middle highlighted */}
const IconRijtjes = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {/* Left house */}
    <path d="M2 21v-8l3-3 3 3v8" />
    <path d="M3.5 16h3" />
    {/* Middle house (taller) */}
    <path d="M8 21V9l4-4 4 4v12" />
    <path d="M10 16h4" />
    <path d="M10 19h4" />
    {/* Right house */}
    <path d="M16 21v-8l3-3 3 3v8" />
    <path d="M17.5 16h3" />
    {/* Ground line */}
    <path d="M2 21h20" />
  </svg>
);

{/* Hoekwoning: 2 houses forming an L-corner */}
const IconHoek = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {/* Front house */}
    <path d="M3 21V10l5-5 5 5v11" />
    <path d="M5.5 15h5" />
    <path d="M5.5 18h5" />
    {/* Side wing (receding, shorter) */}
    <path d="M13 21v-7l4-3v10" />
    <path d="M14.5 16h2" />
    {/* Corner accent */}
    <path d="M13 14l4-3" />
    {/* Ground line */}
    <path d="M3 21h18" />
  </svg>
);

{/* Vrijstaand: single detached house with space around it */}
const IconVrijstaand = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {/* House body */}
    <path d="M6 21V10l6-6 6 6v11" />
    {/* Door */}
    <path d="M10 21v-4h4v4" />
    {/* Window */}
    <path d="M9 14h6" />
    {/* Chimney */}
    <path d="M15 7V4h2v5" />
    {/* Ground line with space */}
    <path d="M2 21h20" />
  </svg>
);

const OPTIONS = [
  { value: "RIJTJES", label: "Rijtjeswoning", icon: IconRijtjes },
  { value: "HOEK", label: "Hoekwoning", icon: IconHoek },
  { value: "VRIJSTAAND", label: "Vrijstaande woning", icon: IconVrijstaand },
];

export default function Step5Woningtype({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.dwelling_type_user) {
      setError("Maak een keuze om verder te gaan");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={5} onBack={onBack}>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-brand-blue tracking-tight">
          Wat voor type woning heeft u?
        </h2>

        <SingleSelect
          options={OPTIONS}
          selected={formData.dwelling_type_user}
          onChange={(v) => {
            updateField("dwelling_type_user", v);
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
