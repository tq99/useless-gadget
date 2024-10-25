"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

type TimeDisplayProps = {
  label: string;
  value: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <span className="text-lg font-semibold">{value}</span>
  </div>
);

export default function Home() {
  const [foodItems, setFoodItems] = useState<string>("");
  const [times, setTimes] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodItems: foodItems.split(",").map((item) => item.trim()),
          times: times.split(",").map((time) => time.trim()),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.output);
      } else {
        setOutput("Error fetching data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setOutput("An error occurred while calculating digestion time.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatOutput = (outputText: string | null) => {
    if (!outputText) return null;

    const [duration, completionTime] = outputText
      .split("|")
      .map((str) => str.trim());

    return (
      <div className="space-y-4">
        <TimeDisplay label="Digestion Duration" value={duration} />
        <TimeDisplay label="Complete By" value={completionTime} />
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Digestion Time Calculator</CardTitle>
            <CardDescription>
              Calculate estimated digestion time for your meals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="foodItems">Food Items</Label>
                <Input
                  id="foodItems"
                  placeholder="e.g., apples, bread, chicken"
                  value={foodItems}
                  onChange={(e) => setFoodItems(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="times">Time Eaten</Label>
                <Input
                  id="times"
                  placeholder="e.g., 2pm, 3pm, 4pm"
                  value={times}
                  onChange={(e) => setTimes(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Calculating..." : "Calculate Digestion Time"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {output && (
          <Card>
            <CardContent className="pt-6">{formatOutput(output)}</CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
