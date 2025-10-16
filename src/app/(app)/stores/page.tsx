
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, ShoppingBag, Building } from 'lucide-react';
import Image from 'next/image';

const stores = [
  {
    name: 'The Daily Grind',
    category: 'Coffee & Snacks',
    image: 'https://picsum.photos/seed/store1/600/400',
    dataAiHint: 'modern cafe',
    location: '123 Main Street',
  },
  {
    name: 'Salad Haven',
    category: 'Healthy Eats',
    image: 'https://picsum.photos/seed/store2/600/400',
    dataAiHint: 'fresh salad bowl',
    location: '456 Oak Avenue',
  },
  {
    name: 'Grand Cinema',
    category: 'Entertainment',
    image: 'https://picsum.photos/seed/store3/600/400',
    dataAiHint: 'movie theater entrance',
    location: '789 Pine Lane',
  },
  {
    name: "Scoop's Delight",
    category: 'Desserts',
    image: 'https://picsum.photos/seed/store4/600/400',
    dataAiHint: 'ice cream shop',
    location: '101 Maple Drive',
  },
  {
    name: 'Bookworm Nook',
    category: 'Books & Stationery',
    image: 'https://picsum.photos/seed/store5/600/400',
    dataAiHint: 'cozy bookstore',
    location: '212 Elm Street',
  },
  {
    name: 'Tech Galaxy',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/store6/600/400',
    dataAiHint: 'electronics store',
    location: '333 Tech Way',
  },
];

export default function StoresPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Participating Stores</h1>
        <p className="text-muted-foreground">
          Your rewards are welcome at these amazing local businesses!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Card key={store.name} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image
                src={store.image}
                alt={store.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                data-ai-hint={store.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {store.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                 <ShoppingBag className="h-4 w-4" />
                 {store.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                 <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{store.location}</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

    