
'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockClassrooms } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Activity as ActivityIcon,
  BarChart,
  Target,
  BookOpen,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis } from "recharts"


export default function StudentPage({
  params,
}: {
  params: { id: string; studentId: string };
}) {
  const classroom = mockClassrooms.find((c) => c.id === params.id);
  const student = classroom?.students.find((s) => s.id === params.studentId);

  if (!classroom || !student) {
    notFound();
  }
  
  const chartData = [
      { month: "January", progress: 65 },
      { month: "February", progress: 70 },
      { month: "March", progress: 78 },
      { month: "April", progress: 80 },
      { month: "May", progress: 85 },
  ]

  const chartConfig = {
      progress: {
        label: "Progress",
        color: "hsl(var(--primary))",
      },
  }


  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm" className="w-fit">
        <Link
          href={`/teacher/classrooms/${params.id}`}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {classroom.name}</span>
        </Link>
      </Button>

      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person photo"/>
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            {student.name}
          </h1>
          <p className="text-muted-foreground">
            {classroom.subject} | {classroom.grade}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-2">
                <div className="flex justify-between font-mono text-lg">
                    <span>{student.progress}%</span>
                    <span className="text-muted-foreground">100%</span>
                </div>
                <Progress value={student.progress} />
                <p className="text-xs text-muted-foreground text-center pt-2">Module completion rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {student.strengths.map((strength) => (
                <Badge key={strength} variant="secondary" className="bg-green-100 text-green-800">{strength}</Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {student.weaknesses.map((weakness) => (
                <Badge key={weakness} variant="secondary" className="bg-red-100 text-red-800">{weakness}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <ActivityIcon className="h-5 w-5 text-primary" />
                    Recent Activity
                </CardTitle>
                <CardDescription>
                    A log of the student's most recent interactions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {student.recentActivity.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {student.recentActivity.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-xs text-muted-foreground">{activity.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {activity.type === 'completion' && <CheckCircle className="h-4 w-4 text-green-500" />}
                                            {activity.type === 'struggle' && <AlertCircle className="h-4 w-4 text-red-500" />}
                                            {activity.type === 'improvement' && <TrendingUp className="h-4 w-4 text-blue-500" />}
                                            <span>{activity.description}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-muted-foreground">No recent activity to display.</p>
                )}
            </CardContent>
        </Card>
        <Card>
             <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Progress Over Time
                </CardTitle>
                <CardDescription>
                    Monthly progress based on module completions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-48 w-full">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
