import { createChallenge } from "../actions";
import { ChallengeView } from "./challenge-view";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ChallengePage({
  params,
}: {
  params: { subject: string };
}) {
  const subject = decodeURIComponent(params.subject);
  const initialChallenge = await createChallenge(subject);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>
      <ChallengeView initialChallenge={initialChallenge} subject={subject} />
    </div>
  );
}
