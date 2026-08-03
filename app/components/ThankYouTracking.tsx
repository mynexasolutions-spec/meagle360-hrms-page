"use client";

import { useEffect } from "react";
import { trackDemoRequestConversion } from "../lib/analytics";

export function ThankYouTracking() {
  useEffect(() => {
    trackDemoRequestConversion();
  }, []);

  return null;
}
