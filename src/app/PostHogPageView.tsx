'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import posthog from "posthog-js";
import { attributionKeys, readLeadAttribution } from "@/lib/lead-attribution";

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      try {
        const stored = readLeadAttribution();
        if (!stored.landingPage) {
          const attribution: Record<string, string> = { ...stored, landingPage: pathname };
          for (const key of attributionKeys) {
            const value = searchParams?.get(key);
            if (value) attribution[key] = value;
          }
          sessionStorage.setItem('tce_attribution', JSON.stringify(attribution));
        }
      } catch {
        // Quote submission still works when session storage is unavailable.
      }
    }
    // Track pageview
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        '$current_url': url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
