import React from 'react';
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
import { ArrowRight, Sparkles, Zap, Boxes } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 items-center justify-between">
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
      <section className=" flex flex-col items-center  px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge className="mb-4" variant="secondary">
            ✨ Introducing Useless Gadget 2.0
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Making useless things
            <br className="hidden sm:inline" /> extraordinarily well
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl text-center">
            We specialize in creating the most sophisticated solutions to problems that don't exist.
            Join thousands of users who are solving imaginary problems daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" flex flex-col items-center px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                So fast you won't even notice it's not doing anything useful.
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
                    "It's amazingly quick at being useless!"
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <Boxes className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>AI Powered</CardTitle>
              <CardDescription>
                Uses advanced AI to generate absolutely meaningless results.
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
                    "The AI makes it feel important!"
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Beautiful UI</CardTitle>
              <CardDescription>
                Gorgeous interface that distracts from its lack of purpose.
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
                    "At least it looks amazing!"
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
