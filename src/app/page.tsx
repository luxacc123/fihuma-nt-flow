"use client";

import { useState, useEffect, useCallback } from "react";
import { LeadFormData, INITIAL_FORM_DATA } from "@/types/form";
import ProgressBar from "@/components/ProgressBar";
import Step0Hero from "@/components/steps/Step0Hero";
import Step1Address from "@/components/steps/Step1Address";
import Step2EnergyLabel from "@/components/steps/Step2EnergyLabel";
import Step3WozBand from "@/components/steps/Step3WozBand";
import Step4Woonsituatie from "@/components/steps/Step4Woonsituatie";
import Step5Woningtype from "@/components/steps/Step5Woningtype";
import Step6PoorParts from "@/components/steps/Step4PoorParts";
import Step7Result from "@/components/steps/Step7Result";
import Step8Intent from "@/components/steps/Step6Intent";
import Step9Contact from "@/components/steps/Step8Contact";
import Step10ThankYou from "@/components/steps/Step9ThankYou";

// Steps 1-6 are question steps that show a progress bar
const TOTAL_QUESTION_STEPS = 6;

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Capture UTM params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    }));
  }, []);

  const updateField = useCallback(
    <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const goNext = useCallback(() => {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || "Verzenden mislukt. Probeer het opnieuw."
        );
      }

      setStep(10); // Thank you
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis. Probeer het opnieuw."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const stepProps = {
    formData,
    updateField,
    onNext: goNext,
    onBack: goBack,
  };

  // Progress bar for question steps 1-6
  const showProgress = step >= 1 && step <= 6;

  return (
    <main className="min-h-screen flex flex-col items-center px-5 py-6 sm:py-12">
      <div className="w-full max-w-[520px]">
        {showProgress && (
          <ProgressBar current={step} total={TOTAL_QUESTION_STEPS} />
        )}

        {step === 0 && <Step0Hero onNext={goNext} />}
        {step === 1 && <Step1Address {...stepProps} />}
        {step === 2 && <Step2EnergyLabel {...stepProps} />}
        {step === 3 && <Step3WozBand {...stepProps} />}
        {step === 4 && <Step4Woonsituatie {...stepProps} />}
        {step === 5 && <Step5Woningtype {...stepProps} />}
        {step === 6 && <Step6PoorParts {...stepProps} />}
        {step === 7 && <Step7Result {...stepProps} />}
        {step === 8 && <Step8Intent {...stepProps} />}
        {step === 9 && (
          <Step9Contact
            {...stepProps}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={handleSubmit}
          />
        )}
        {step === 10 && <Step10ThankYou />}
      </div>
    </main>
  );
}
