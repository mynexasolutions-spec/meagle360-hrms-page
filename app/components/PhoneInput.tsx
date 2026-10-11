"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, flagEmoji, type Country } from "../lib/countries";

type PhoneInputProps = {
  id?: string;
  /** Pass this for uncontrolled/FormData forms — renders a hidden input
   *  under this name carrying the combined "+91 98765 43210" value, so the
   *  parent form's existing FormData.get("phone") keeps working unchanged. */
  name?: string;
  required?: boolean;
  /** Controlled mode: the national number only (no dial code). */
  value?: string;
  /** Controlled mode: called with (fullPhoneWithDialCode, nationalNumber, dialCode). */
  onChange?: (full: string, national: string, dialCode: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

// One shared, session-lifetime cache so the IP lookup only ever fires once
// per page load, no matter how many PhoneInput instances are on the page.
let detectedCountryPromise: Promise<Country> | null = null;
function detectCountry(): Promise<Country> {
  if (detectedCountryPromise) return detectedCountryPromise;
  detectedCountryPromise = (async () => {
    try {
      const res = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(2500) });
      const data = await res.json();
      if (data?.success && data.country_code) {
        const match = COUNTRIES.find((c) => c.iso2 === data.country_code);
        if (match) return match;
      }
    } catch {
      // IP lookup failed or timed out — fall through to locale-based guess.
    }
    try {
      const region = navigator.language?.split("-")[1]?.toUpperCase();
      const match = region && COUNTRIES.find((c) => c.iso2 === region);
      if (match) return match;
    } catch {
      // ignore
    }
    return DEFAULT_COUNTRY;
  })();
  return detectedCountryPromise;
}

export function PhoneInput({
  id,
  name,
  required,
  value,
  onChange,
  placeholder,
  ariaLabel,
}: PhoneInputProps) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [number, setNumber] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // Only auto-apply the detected country if the visitor hasn't already
  // picked one themselves in this field.
  const userPickedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    detectCountry().then((c) => {
      if (!cancelled && !userPickedRef.current) setCountry(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  function handleNumberChange(raw: string) {
    const cleaned = raw.replace(/[^\d\s-]/g, "");
    setNumber(cleaned);
    onChange?.(`${country.dialCode} ${cleaned}`.trim(), cleaned, country.dialCode);
  }

  function handleCountrySelect(c: Country) {
    userPickedRef.current = true;
    setCountry(c);
    setOpen(false);
    setSearch("");
    onChange?.(`${c.dialCode} ${number}`.trim(), number, c.dialCode);
  }

  const filtered = search.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search)
      )
    : COUNTRIES;

  const fullValue = `${country.dialCode} ${number}`.trim();

  return (
    <div className="phone-input" ref={rootRef}>
      <div className="phone-input-code-wrap">
        <button
          type="button"
          className="phone-input-code"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Country code"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="phone-input-flag" aria-hidden="true">
            {flagEmoji(country.iso2)}
          </span>
          <span>{country.dialCode}</span>
          <svg className="phone-input-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="phone-input-dropdown" role="listbox">
            <input
              ref={searchRef}
              type="text"
              className="phone-input-search"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="phone-input-list">
              {filtered.length === 0 && <div className="phone-input-no-results">No matches</div>}
              {filtered.map((c) => (
                <button
                  type="button"
                  key={c.iso2}
                  role="option"
                  aria-selected={c.iso2 === country.iso2}
                  className={`phone-input-option${c.iso2 === country.iso2 ? " selected" : ""}`}
                  onClick={() => handleCountrySelect(c)}
                >
                  <span className="phone-input-flag" aria-hidden="true">
                    {flagEmoji(c.iso2)}
                  </span>
                  <span className="phone-input-country-name">{c.name}</span>
                  <span className="phone-input-dial">{c.dialCode}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        required={required}
        aria-label={ariaLabel || "Phone number"}
        placeholder={placeholder || "98765 43210"}
        value={number}
        onChange={(e) => handleNumberChange(e.target.value)}
      />
      {name && <input type="hidden" name={name} value={fullValue} />}
    </div>
  );
}
