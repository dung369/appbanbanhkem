"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";

export default function FirebaseAnalyticsClient() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
