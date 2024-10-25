"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here
    // For example, call an API to authenticate the user
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Login failed. Please check your credentials.");
    } else {
      // Handle successful login (e.g., redirect or update state)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card>
        <CardHeader>
          <h2 className="text-3xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            {"Don't have an account?"} <a href="/signup">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
