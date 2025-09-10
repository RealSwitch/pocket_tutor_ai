import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChapterSelection() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a chapter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chapters</SelectLabel>
          <SelectItem value="chapter-1">Chapter 1: Introduction</SelectItem>
          <SelectItem value="chapter-2">Chapter 2: Core Concepts</SelectItem>
          <SelectItem value="chapter-3">Chapter 3: Advanced Topics</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
