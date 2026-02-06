"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const INTENT_OPTIONS = [
  { value: "YES", label: "Ja" },
  { value: "MAYBE", label: "Misschien" },
  { value: "NO", label: "Nee" },
];

export default function Step6Intent({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.considering_insulation) {
      setError("Maak een keuze om verder te gaan");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <StepWrapper stepKey={6} onBack={onBack}>
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">
            Dacht u zelf al aan (extra) isolatie?
          </h2>

          <SingleSelect
            options={INTENT_OPTIONS}
            selected={formData.considering_insulation}
            onChange={(v) => {
              updateField("considering_insulation", v);
              setError("");
            }}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-4 pt-2">
          <TextInput
            label="Zijn er aandachtspunten waar onze adviseur rekening mee moet houden?"
            value={formData.pain_points}
            onChange={(v) => updateField("pain_points", v)}
            placeholder="Bijv. tocht, hoge energierekening, vocht..."
            multiline
            rows={2}
          />

          <TextInput
            label="Licht uw situatie kort toe (optioneel)"
            value={formData.paste_text}
            onChange={(v) => updateField("paste_text", v)}
            placeholder="Eventuele extra toelichting..."
            multiline
            rows={3}
          />
        </div>

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
