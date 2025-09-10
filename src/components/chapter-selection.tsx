
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Chapter } from "@/lib/curriculum-data";

export function ChapterSelection({ chapters, disabled }: { chapters: Chapter[], disabled: boolean }) {
  return (
    <Select disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a chapter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chapters</SelectLabel>
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <SelectItem key={chapter.id} value={chapter.id}>
                {chapter.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-chapters" disabled>
              Select a grade and subject first
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
