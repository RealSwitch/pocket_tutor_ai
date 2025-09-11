
'use client';

import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { signUpWithEmail } from '../auth/actions';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Create account
      </Button>
    );
  }

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // This client action correctly formats the data for the server action
    async function clientAction(formData: FormData) {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const result = formSchema.safeParse({ email, password });
        if (!result.success) {
            return;
        }

        await signUpWithEmail({ email, password });
    }

  return (
    <>
      <Form {...form}>
        <form action={clientAction} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>
      <div className="mt-6">
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold leading-6 text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
