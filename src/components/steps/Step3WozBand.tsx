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
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
          Weet u of de WOZ-waarde van uw woning hoger is dan &euro;477.000?
        </h2>

        <SingleSelect
          options={OPTIONS}
          selected={formData.woz_band}
          onChange={(v) => {
            updateField("woz_band", v);
            setError("");
          }}
        />

        <p className="text-xs text-gray-400">
          Als u het niet weet: kies &lsquo;Weet ik niet&rsquo;.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
