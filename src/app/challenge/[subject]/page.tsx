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
  // Initial challenge can be of any difficulty, subsequent ones will be based on XP.
  const initialChallenge = await createChallenge(subject);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="mb-4 absolute top-6 left-6 z-10">
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
