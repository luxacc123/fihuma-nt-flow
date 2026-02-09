"use client";

import { useState } from "react";
import type { StepProps } from "@/types/form";
import StepWrapper from "@/components/StepWrapper";
import Button from "@/components/ui/Button";

const OPTIONS = [
  { value: "RIJTJES", label: "Rijtjeswoning" },
  { value: "HOEK", label: "Hoekwoning" },
  { value: "VRIJSTAAND", label: "Vrijstaande woning" },
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
      <div className="space-y-5">
        <h2 className="text-xl font-bold text-brand-blue">
          Wat voor type woning heeft u?
        </h2>

        <div className="space-y-3">
          {OPTIONS.map((option) => {
            const isSelected = formData.dwelling_type_user === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  updateField("dwelling_type_user", option.value);
                  setError("");
                }}
                className={`w-full rounded-xl border-2 px-4 py-4 text-left text-base transition-all duration-200 cursor-pointer flex items-center gap-4 min-h-[60px] ${
                  isSelected
                    ? "border-brand-green bg-brand-green-light text-brand-blue font-semibold shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {/* Placeholder icon container — ready for future SVG house graphics */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-brand-green/10" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${isSelected ? "text-brand-green" : "text-gray-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>

                <span className="flex-1">{option.label}</span>

                {isSelected && (
                  <svg
                    className="w-5 h-5 text-brand-green shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleNext}>Volgende</Button>
      </div>
    </StepWrapper>
  );
}
