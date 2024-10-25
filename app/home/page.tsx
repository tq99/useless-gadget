"use client";
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ModeToggle from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Leaf, Utensils , PawPrint } from 'lucide-react';
import { Sparkles } from "lucide-react";

export default function Home() {
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">Useless Gadget</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" size="sm">
              Sign in
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge className="mb-4" variant="secondary">
            ✨ Welcome to Useless Gadget 2.0
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Discover the art of identifying the identifiable
            <br className="hidden sm:inline" /> and having fun!
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl text-center">
            Dive into a world where we help you figure out if it's a plant, food, or just a living thing! 
            Embrace the joy of solving utterly pointless mysteries with our quirky gadget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="gap-2" onClick={scrollToFeatures}>
              Start Exploring <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="flex flex-col items-center px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Check Plants</CardTitle>
              <CardDescription>
                Upload a photo to see if it's a plant. 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Alice Cooper</span>
                  <span className="text-sm text-muted-foreground">
                    "It identified my houseplants effortlessly!"
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <Utensils className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Check Food</CardTitle>
              <CardDescription>
                Snap a pic and find out if it's food. 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback>BN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Bob Newman</span>
                  <span className="text-sm text-muted-foreground">
                    "I learned my pizza was technically food!"
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Check Living Things</CardTitle>
              <CardDescription>
                Find out if it's a living thing with a simple click!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/api/placeholder/32/32" alt="User" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Carol Davis</span>
                  <span className="text-sm text-muted-foreground">
                    "It told me my cat is alive. Good to know!"
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
