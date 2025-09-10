
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockClassrooms, type Classroom } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, BookOpen, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddStudentDialog } from './add-student-dialog';
import { Progress } from '@/components/ui/progress';
import { ChatRoom } from './chatroom';


export default function ClassroomPage({ params }: { params: { id: string } }) {
  const classroom = mockClassrooms.find((c) => c.id === params.id);

  if (!classroom) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Button asChild variant="outline" size="sm" className="w-fit mb-4">
            <Link href="/teacher" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              {classroom.name}
            </h1>
            <Badge variant="secondary">{classroom.grade}</Badge>
          </div>
          <p className="text-muted-foreground">{classroom.subject}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Students</CardTitle>
              <AddStudentDialog />
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classroom.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person photo" />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                       <TableCell>
                         <div className="flex items-center gap-2">
                            <Progress value={student.progress} className="w-24 h-2" />
                            <span className="text-xs text-muted-foreground font-mono">{student.progress}%</span>
                         </div>
                      </TableCell>
                       <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                            <Link href={`/teacher/classrooms/${classroom.id}/students/${student.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}
