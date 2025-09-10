
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Students</CardTitle>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Student
              </Button>
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
                       <TableCell className="text-muted-foreground">
                        N/A
                      </TableCell>
                       <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{classroom.studentCount} Students</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{classroom.moduleCount} Modules</span>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader  className="flex flex-row items-center justify-between">
              <CardTitle>Modules</CardTitle>
               <Button size="sm" variant="secondary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Module
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No modules added yet.</p>
            </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

    