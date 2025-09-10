
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectGrade({ onGradeChange }: { onGradeChange: (grade: string) => void }) {
  return (
    <Select onValueChange={onGradeChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a grade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Grades</SelectLabel>
          <SelectItem value="grade-8">Grade 8</SelectItem>
          <SelectItem value="grade-9">Grade 9</SelectItem>
          <SelectItem value="grade-10">Grade 10</SelectItem>
          <SelectItem value="grade-11">Grade 11</SelectItem>
          <SelectItem value="grade-12">Grade 12</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
