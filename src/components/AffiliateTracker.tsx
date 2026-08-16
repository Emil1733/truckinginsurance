"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams?.get("ref");
    if (ref) {
      localStorage.setItem("affiliate_ref", ref);
      console.log("Affiliate referral tracked:", ref);
    }
  }, [searchParams]);

  return null;
}