"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import Button from "@/components/ui/Button";

const OPTIONS = [
  { value: "UNDER_477", label: "Nee / lager dan \u20AC477.000" },
  { value: "OVER_477", label: "Ja / hoger dan \u20AC477.000" },
  { value: "DONT_KNOW", label: "Weet ik niet" },
];

export default function Step3WozBand({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.woz_band) {
      setError("Maak een keuze om verder te gaan");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={3} onBack={onBack}>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight">
            Weet u of de WOZ-waarde van uw woning hoger is dan &euro;477.000?
          </h2>
          <p className="text-sm text-gray-400">
            Twijfelt u? Kies dan &lsquo;Weet ik niet&rsquo;.
          </p>
        </div>

        <SingleSelect
          options={OPTIONS}
          selected={formData.woz_band}
          onChange={(v) => {
            updateField("woz_band", v);
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
