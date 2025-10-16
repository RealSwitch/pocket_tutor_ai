
'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  BarChart,
  Target,
  MessageSquare,
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
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

// Mock data for a single student linked to the parent
const student = { 
    id: 's1', 
    name: 'Alice Johnson', 
    avatar: 'https://picsum.photos/id/1027/100/100',
    progress: 85,
    strengths: ['Linear Equations', 'Graphing'],
    weaknesses: ['Quadratic Formula', 'Word Problems'],
    recentActivity: [
        { date: '2024-07-20', description: 'Completed "Linear Equations" module.', type: 'completion' },
        { date: '2024-07-19', description: 'Struggled with "Quadratic Equations" quiz.', type: 'struggle' },
        { date: '2024-07-18', description: 'Improved score on "Graphing" practice.', type: 'improvement' },
    ],
    classroom: {
        id: 'class-1',
        name: 'Algebra Avengers',
        teacher: 'Mr. Davison'
    }
};

const chartData = [
    { month: "January", progress: 65 },
    { month: "February", progress: 70 },
    { month: "March", progress: 78 },
    { month: "April", progress: 80 },
    { month: "May", progress: 85 },
];

const chartConfig = {
    progress: {
      label: "Progress",
      color: "hsl(var(--primary))",
    },
};

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Parent Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your child's learning journey.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
             <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person photo"/>
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline text-2xl">{student.name}</CardTitle>
                <CardDescription>
                    {student.classroom.name} (Teacher: {student.classroom.teacher})
                </CardDescription>
            </div>
        </CardHeader>
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-lg">
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
            <CardTitle className="font-headline flex items-center gap-2 text-lg">
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
            <CardTitle className="font-headline flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
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

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-lg">
                        <Activity className="h-5 w-5 text-primary" />
                        Recent Activity
                    </CardTitle>
                    <CardDescription>
                        A log of your child's most recent interactions.
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
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-lg">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Chat with {student.classroom.teacher}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg mt-1">
                            <p className="text-sm">Hi Mr. Davison, I noticed Alice struggled with the quadratics quiz. Is there anything we can do to help her prepare for the next one?</p>
                            <p className="text-xs text-muted-foreground text-right mt-1">You - 1h ago</p>
                        </div>
                         <div className="p-3 bg-primary/10 rounded-lg mt-1">
                            <p className="text-sm">Of course! I can assign her some foundational exercises to build her confidence. I'll also be going over the topic again in class on Friday. Thanks for reaching out!</p>
                             <p className="text-xs text-muted-foreground text-right mt-1">{student.classroom.teacher} - 30m ago</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center gap-2">
                        <Textarea placeholder="Type a message..." className="flex-1 resize-none" rows={1} />
                        <Button size="icon">
                            <Send />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
      </div>

    </div>
  );
}
