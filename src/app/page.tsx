
import 'server-only';
import {
  Calculator,
  Landmark,
  Globe,
  Dna,
  TrendingUp,
  FlaskConical,
  Trophy,
  Medal,
  Sparkles,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Subject = {
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  studyHref: string;
  color: string;
};

const subjects: Subject[] = [
  {
    name: 'Mathematics',
    description: 'Puzzles & logic games',
    icon: Calculator,
    href: '/challenge/Mathematics',
    studyHref: '/study/Mathematics',
    color: 'text-blue-500',
  },
  {
    name: 'Accounting',
    description: 'Money simulations',
    icon: Landmark,
    href: '/challenge/Accounting',
    studyHref: '/study/Accounting',
    color: 'text-green-500',
  },
  {
    name: 'Geography',
    description: 'Map explorations',
    icon: Globe,
    href: '/challenge/Geography',
    studyHref: '/study/Geography',
    color: 'text-orange-500',
  },
  {
    name: 'Life Sciences',
    description: 'Ecosystem balance games',
    icon: Dna,
    href: '/challenge/Life%20Sciences',
    studyHref: '/study/Life%20Sciences',
    color: 'text-purple-500',
  },
  {
    name: 'Economics',
    description: 'Market simulations',
    icon: TrendingUp,
    href: '/challenge/Economics',
    studyHref: '/study/Economics',
    color: 'text-red-500',
  },
  {
    name: 'Physical Science',
    description: 'Virtual lab experiments',
    icon: FlaskConical,
    href: '/challenge/Physical%20Science',
    studyHref: '/study/Physical%20Science',
    color: 'text-yellow-500',
  },
];

const leaderboard = [
  { name: 'Elena', points: 4230, avatar: 'https://picsum.photos/id/1027/100/100' },
  { name: 'Marcus', points: 3980, avatar: 'https://picsum.photos/id/1005/100/100' },
  { name: 'You', points: 3510, avatar: 'https://picsum.photos/id/1012/100/100' },
  { name: 'Aisha', points: 3450, avatar: 'https://picsum.photos/id/1011/100/100' },
  { name: 'Chen', points: 3120, avatar: 'https://picsum.photos/id/1025/100/100' },
];

export default function Dashboard() {
  const progressValue = (3510 / 4000) * 100;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Choose your challenge and keep learning.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Choose Your Subject</CardTitle>
            <CardDescription>
              Select a subject to start a study session or a gamified challenge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {subjects.map((subject) => (
                <div key={subject.name} className="group flex flex-col space-y-3 rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg hover:border-primary">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-background p-4 border">
                      <subject.icon
                        className={`h-8 w-8 ${subject.color} transition-colors group-hover:text-primary`}
                      />
                    </div>
                  </div>
                  <p className="font-semibold">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {subject.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                     <Button asChild variant="outline" size="sm">
                       <Link href={subject.studyHref}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Study
                       </Link>
                     </Button>
                     <Button asChild size="sm">
                       <Link href={subject.href}>
                         Challenge
                       </Link>
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="text-accent h-6 w-6" /> Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>Level 12</span>
                  <span className="text-muted-foreground">3510 / 4000 XP</span>
                </div>
                <Progress value={progressValue} />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Badges Earned
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-yellow-600" /> Algebra Ninja
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-slate-500" /> Geometry Apprentice
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-amber-800" /> Fraction Master
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Trophy className="text-accent h-6 w-6" /> Leaderboard
              </CardTitle>
              <CardDescription>Weekly top performers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((player, index) => (
                    <TableRow
                      key={player.name}
                      className={player.name === 'You' ? 'bg-secondary' : ''}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="person photo" />
                            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{player.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {player.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
