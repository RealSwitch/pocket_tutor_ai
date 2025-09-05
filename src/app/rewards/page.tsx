import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Ticket } from 'lucide-react';
import Image from 'next/image';
import { QrCode } from '@/components/qr-code';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const rewards = [
  {
    name: 'Free Coffee',
    partner: 'The Daily Grind',
    cost: 500,
    image: 'https://picsum.photos/600/400?id=1',
    dataAiHint: 'coffee cup',
  },
  {
    name: '10% Off Lunch',
    partner: 'Salad Haven',
    cost: 750,
    image: 'https://picsum.photos/600/400?id=2',
    dataAiHint: 'healthy salad',
  },
  {
    name: 'Movie Ticket',
    partner: 'Grand Cinema',
    cost: 1500,
    image: 'https://picsum.photos/600/400?id=3',
    dataAiHint: 'movie theater',
  },
  {
    name: 'Ice Cream Scoop',
    partner: "Scoop's Delight",
    cost: 300,
    image: 'https://picsum.photos/600/400?id=4',
    dataAiHint: 'ice cream',
  },
];

export default function RewardsPage() {
  const userPoints = 3510;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Rewards</h1>
        <p className="text-muted-foreground">
          Redeem your hard-earned points for real-world treats!
        </p>
      </div>

      <Card className="bg-primary text-primary-foreground shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline text-2xl">Your Points</CardTitle>
            <CardDescription className="text-primary-foreground/80">Ready to be spent</CardDescription>
          </div>
          <div className="text-5xl font-bold font-mono">{userPoints}</div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rewards.map((reward) => (
          <Card key={reward.name} className="flex flex-col overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                src={reward.image}
                alt={reward.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint={reward.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle>{reward.name}</CardTitle>
              <CardDescription>from {reward.partner}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
              <div className="font-bold text-lg text-primary flex items-center gap-1">
                <Ticket className="h-5 w-5" />
                {reward.cost}
              </div>

               <Dialog>
                <DialogTrigger asChild>
                   <Button disabled={userPoints < reward.cost}>Redeem</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Redeem: {reward.name}</DialogTitle>
                    <DialogDescription>
                      Show this QR code to {reward.partner} to claim your reward.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center p-4">
                    <QrCode value={`${reward.name}-${reward.partner}-${reward.cost}`} />
                  </div>
                </DialogContent>
              </Dialog>

            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
