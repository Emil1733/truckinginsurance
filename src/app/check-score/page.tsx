import CheckScoreClient from "@/components/check-score/CheckScoreClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Check Your DOT Safety Score (Live FMCSA Data)',
  description: 'Instant carrier health check. See your Unsafe Driving, Maintenance, and HOS scores exactly as insurance underwriters see them. Free tool.',
  alternates: {
    canonical: '/check-score',
  },
};

export default function CheckScorePage() {
  return <CheckScoreClient />;
}
