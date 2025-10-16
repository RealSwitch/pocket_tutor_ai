
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockMessages = [
  {
    id: 'msg1',
    name: 'Alice Johnson',
    avatar: 'https://picsum.photos/id/1027/100/100',
    text: 'Hey everyone! 👋 Just finished the linear equations module. Anyone have questions?',
  },
  {
    id: 'msg2',
    name: 'Bob Williams',
    avatar: 'https://picsum.photos/id/1005/100/100',
    text: "I'm a bit stuck on the last part of the quadratic formula exercise. Can someone help?",
  },
  {
    id: 'msg3',
    name: 'Mr. Davison (Teacher)',
    avatar: 'https://picsum.photos/id/1012/100/100',
    text: 'Great question, Bob. Remember to check the discriminant first. What does b^2 - 4ac tell you?',
  },
    {
    id: 'msg4',
    name: 'Diana Miller',
    avatar: 'https://picsum.photos/id/1011/100/100',
    text: 'Ohh, right! That helps a lot, thanks Mr. D!',
  },
];


export function ChatRoom() {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    // Generate a random number on the client after the initial render
    setOnlineCount(Math.floor(Math.random() * 6) + 1);
  }, []);

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Classroom Chat</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                <span>{onlineCount} Currently Online</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-6">
            <div className="space-y-6">
                {mockMessages.map(message => (
                    <div key={message.id} className="flex items-start gap-4">
                        <Avatar className="h-8 w-8 border">
                            <AvatarImage src={message.avatar} alt={message.name} data-ai-hint="person photo" />
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{message.name}</p>
                            <div className="p-3 bg-muted rounded-lg mt-1">
                                <p className="text-sm">{message.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center gap-2">
            <Textarea placeholder="Type a message..." className="flex-1 resize-none" rows={1} />
            <Button size="icon">
                <Send />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
