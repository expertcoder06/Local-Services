'use client';

import {Button} from '@/components/ui/button';
import {Package2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
        <Link href="#" className="flex items-center justify-center">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold">Local Services</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            How It Works
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
           <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
             <Link href="/login">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh]">
          <Image
            src="https://picsum.photos/seed/hero-background/1800/1200"
            alt="Background"
            fill
            className="object-cover object-center opacity-30"
            data-ai-hint="street view"
          />
          <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Find Trusted Help, Right Next Door
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Connect with skilled local professionals for any job, big or
                small. Fair prices, real-time bidding, and secure payments all
                within a 5-10 km radius.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Get Local Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-4 bg-background">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Local Services. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
