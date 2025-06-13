"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Play, Pause, Zap, AlertCircle} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

export default function MindSweep() {
  const [isTracking, setIsTracking] = useState(false);
  const [focusedTime, setFocusedTime] = useState(0); // in seconds
  const [distractedTime, setDistractedTime] = useState(0); // in seconds
  const [nudge, setNudge] = useState(
    "Ready to focus? Start tracking to improve your productivity."
  );
  const [focusPercentage, setFocusPercentage] = useState(100);

  // Example nudges - in a real extension, these would come from AI
  const nudges = [
    "Stay focused! You're doing great work.",
    "Remember your goals. Keep distractions at bay.",
    "Deep work leads to meaningful results. Keep going!",
    "Your future self will thank you for focusing now.",
    "One task at a time. You've got this!",
  ];

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Simulate time tracking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTracking) {
      interval = setInterval(() => {
        // 80% chance of being focused, 20% chance of being distracted
        if (Math.random() > 0.2) {
          setFocusedTime((prev) => prev + 1);
        } else {
          setDistractedTime((prev) => prev + 1);
          // Show a new nudge when distracted
          const randomNudge = nudges[Math.floor(Math.random() * nudges.length)];
          setNudge(randomNudge);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  // Calculate focus percentage
  useEffect(() => {
    const totalTime = focusedTime + distractedTime;
    if (totalTime > 0) {
      setFocusPercentage(Math.round((focusedTime / totalTime) * 100));
    } else {
      setFocusPercentage(100);
    }
  }, [focusedTime, distractedTime]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  return (
    <>
      <ModeToggle />
      <div className="min-h-screen flex items-center justify-center p-4 bg-background overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md z-10"
        >
          <Card className="backdrop-blur-xl bg-background/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="relative h-24 bg-gradient-to-r  ">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=400')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 dark:to-black/40"></div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <ModeToggle />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">MindSweep</h1>
                    <p className="text-xs text-white/80">Focus Tracker</p>
                  </div>
                  <Badge
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      isTracking
                        ? "bg-green-500/90 text-white"
                        : "bg-amber-500/90 text-white"
                    )}
                  >
                    {isTracking ? "Tracking" : "Idle"}
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-5 space-y-6">
              {/* Start/Stop Button */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={toggleTracking}
                  className={cn(
                    "w-full py-6 text-base font-medium rounded-xl shadow-lg transition-all duration-300",
                    isTracking
                      ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  )}
                >
                  <motion.div
                    className="flex items-center gap-2"
                    initial={false}
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 0.3,
                      repeat: isTracking ? 0 : Number.POSITIVE_INFINITY,
                      repeatDelay: 1.5,
                    }}
                  >
                    {isTracking ? (
                      <>
                        <Pause className="h-5 w-5" /> Stop Tracking
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" /> Start Tracking
                      </>
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              {/* Focus Percentage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Focus Level</div>
                  <div className="text-sm font-bold">{focusPercentage}%</div>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      focusPercentage > 80
                        ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                        : focusPercentage > 50
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                        : "bg-gradient-to-r from-red-500 to-rose-400"
                    )}
                    initial={{ width: "0%" }}
                    animate={{ width: `${focusPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Time Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/40 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-emerald-100 dark:bg-emerald-800/30 rounded-full">
                      <Zap className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Focused Time
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {formatTime(focusedTime)}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/30 dark:to-red-900/30 rounded-xl p-4 border border-rose-100 dark:border-rose-800/40 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-rose-100 dark:bg-rose-800/30 rounded-full">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500 dark:text-rose-400" />
                    </div>
                    <div className="text-xs font-medium text-rose-700 dark:text-rose-300">
                      Distracted Time
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {formatTime(distractedTime)}
                  </div>
                </motion.div>
              </div>

              {/* AI Nudge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={nudge}
                className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-xl p-4 border border-violet-100 dark:border-violet-800/40 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-violet-100 dark:bg-violet-800/30 rounded-full">
                    <Brain className="h-3.5 w-3.5 text-violet-500 dark:text-violet-400" />
                  </div>
                  <div className="text-xs font-medium text-violet-700 dark:text-violet-300">
                    AI Nudge
                  </div>
                </div>
                <div className="text-sm italic text-slate-700 dark:text-slate-300">
                  {nudge}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
