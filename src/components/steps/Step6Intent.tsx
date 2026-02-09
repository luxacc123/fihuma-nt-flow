"use client";

import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import SingleSelect from "@/components/ui/SingleSelect";
import MultiSelect from "@/components/ui/MultiSelect";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const INTENT_OPTIONS = [
  { value: "YES", label: "Ja" },
  { value: "NO", label: "Nee" },
];

const PAIN_POINT_OPTIONS = [
  { value: "tocht", label: "Tocht" },
  { value: "koude_vloer", label: "Koude vloer" },
  { value: "vocht", label: "Vocht" },
  { value: "hoge_energierekening", label: "Hoge energierekening" },
];

export default function Step6Intent({
  formData,
  updateField,
  onNext,
  onBack,
}: StepProps) {
  return (
    <StepWrapper stepKey={9} onBack={onBack}>
      <div className="space-y-7">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-brand-blue tracking-tight">
            Voorbereiding op de inspectie
          </h2>
          <p className="text-sm text-gray-400">
            Optioneel &mdash; u kunt ook direct verder gaan
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[15px] font-medium text-gray-600">
            Dacht u al aan isolatie?
          </p>
          <SingleSelect
            options={INTENT_OPTIONS}
            selected={formData.considering_insulation}
            onChange={(v) => updateField("considering_insulation", v)}
          />
        </div>

        <div className="space-y-4">
          <p className="text-[15px] font-medium text-gray-600">
            Zijn er aandachtspunten in huis?
          </p>
          <MultiSelect
            options={PAIN_POINT_OPTIONS}
            selected={formData.pain_points}
            onChange={(v) => updateField("pain_points", v)}
          />
        </div>

        <TextInput
          label="Kunt u iets meer vertellen over uw situatie? (optioneel)"
          value={formData.paste_text}
          onChange={(v) => updateField("paste_text", v)}
          placeholder="Bijv. welke kamers het koudst zijn, plannen voor verbouwing..."
          multiline
          rows={3}
        />

        <Button onClick={onNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
