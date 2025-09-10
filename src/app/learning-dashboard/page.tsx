import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LearningDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Learning Dashboard
        </h1>
        <p className="text-muted-foreground">
          Quick learning nuggets from your selected chapter.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BookOpen className="text-primary h-6 w-6" />
            Chapter Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a chapter on the main dashboard to see learning nuggets here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
