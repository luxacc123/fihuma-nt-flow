export interface LeadFormData {
  // Step 1: Address
  postcode: string;
  house_number: string;
  house_number_addition: string;

  // Step 2: Energy label
  energy_label_choice: string; // "AB" | "C" | "DEFG" | "NONE" | "UNKNOWN"

  // Step 3: WOZ band
  woz_band: string; // "UNDER_477" | "OVER_477" | "DONT_KNOW"

  // Step 4: Housing situation
  housing_situation: string; // "KOOP" | "HUUR"

  // Step 5: Dwelling type
  dwelling_type_user: string; // "RIJTJES" | "HOEK" | "VRIJSTAAND"

  // Step 6: Poor parts (multi-select, stored as array in state)
  poor_parts: string[];

  // Step 7: Already insulated (multi-select, stored as array in state)
  already_insulated_parts: string[];

  // Step 9 (post-activation): Intent
  considering_insulation: string; // "YES" | "NO" | "MAYBE"
  pain_points: string[];
  paste_text: string;

  // Step 8: Result sets preferred contact
  preferred_contact: string; // "PHONE" | "EMAIL"

  // Step 10: Contact details
  contact_name: string;
  phone: string;
  email: string;
  consent_contact: boolean;
  consent_privacy: boolean;

  // UTM tracking
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;

  // Honeypot (anti-spam)
  website: string;

  // Meta
  campaign_code: string;
  landing_version: string;
}

export const INITIAL_FORM_DATA: LeadFormData = {
  postcode: "",
  house_number: "",
  house_number_addition: "",
  energy_label_choice: "",
  woz_band: "",
  housing_situation: "",
  dwelling_type_user: "",
  poor_parts: [],
  already_insulated_parts: [],
  considering_insulation: "",
  pain_points: [],
  paste_text: "",
  preferred_contact: "PHONE",
  contact_name: "",
  phone: "",
  email: "",
  consent_contact: false,
  consent_privacy: false,
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  website: "",
  campaign_code: "fihuma_nt",
  landing_version: "v2",
};

export interface StepProps {
  formData: LeadFormData;
  updateField: <K extends keyof LeadFormData>(
    field: K,
    value: LeadFormData[K]
  ) => void;
  onNext: () => void;
  onBack?: () => void;
}
