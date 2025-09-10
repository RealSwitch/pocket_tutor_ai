
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, BookOpen } from 'lucide-react';
import { mockClassrooms } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CreateClassroomDialog } from './create-classroom-dialog';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your classrooms, modules, and students.
          </p>
        </div>
        <CreateClassroomDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClassrooms.map((classroom) => (
          <Card
            key={classroom.id}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">{classroom.name}</CardTitle>
                <Badge variant="secondary">{classroom.grade}</Badge>
              </div>
              <CardDescription>{classroom.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{classroom.studentCount} Students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{classroom.moduleCount} Modules</span>
              </div>
               <div className="flex -space-x-2 overflow-hidden pt-2">
                {classroom.students.slice(0, 5).map(student => (
                  <Avatar key={student.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                    <AvatarImage src={student.avatar} data-ai-hint="person photo" />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                {classroom.students.length > 5 && (
                   <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                    <AvatarFallback>+{classroom.students.length - 5}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" className="w-full">
                <Link href={`/teacher/classrooms/${classroom.id}`}>Manage Classroom</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
