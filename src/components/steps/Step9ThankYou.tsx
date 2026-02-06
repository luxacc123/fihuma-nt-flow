import StepWrapper from "@/components/StepWrapper";

export default function Step9ThankYou() {
  return (
    <StepWrapper stepKey={9}>
      <div className="text-center space-y-6 py-4">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center">
            <svg
              className="w-8 h-8 text-brand-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-brand-blue">
            Bedankt &mdash; wij nemen contact met u op
          </h2>
          <p className="text-gray-600 text-base">
            Een adviseur belt u om een vrijblijvende inspectie in te plannen
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            U kunt ons ook direct bereiken op:{" "}
            <a
              href="tel:0883038200"
              className="text-brand-green font-semibold hover:underline"
            >
              088-303 82 00
            </a>
          </p>
        </div>
      </div>
    </StepWrapper>
  );
}
