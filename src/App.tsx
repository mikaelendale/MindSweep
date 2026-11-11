import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  AlertCircle,
  Settings,
  Circle,
  Pointer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { ModeToggle } from "./components/mode-toggle";

declare const chrome: any; // Tell TS that chrome exists globally

const SOCIAL_MEDIA_DOMAINS = [
  "tiktok.com",
  "instagram.com",
  "facebook.com",
  "twitter.com",
  "youtube.com",
];

export default function App() {
  const [isTracking, setIsTracking] = useState(false);
  const [focusedTime, setFocusedTime] = useState(0);
  const [distractedTime, setDistractedTime] = useState(0);
  const [nudge, setNudge] = useState(
    "Ready to focus? Start tracking to improve your productivity."
  );
  const [focusPercentage, setFocusPercentage] = useState(100);
  const [, setLastUpdate] = useState(Date.now()); // We only need setter here

  const nudges = [
    "Stay focused! You're doing great work.",
    "Remember your goals. Keep distractions at bay.",
    "Deep work leads to meaningful results. Keep going!",
    "Your future self will thank you for focusing now.",
    "One task at a time. You've got this!",
  ];

  useEffect(() => {
    // Load saved tracking data
    const savedIsTracking = localStorage.getItem("isTracking") === "true";
    const savedFocused = parseInt(localStorage.getItem("focusedTime") || "0");
    const savedDistracted = parseInt(
      localStorage.getItem("distractedTime") || "0"
    );
    const savedLastUpdate = parseInt(
      localStorage.getItem("lastUpdate") || `${Date.now()}`
    );

    if (savedIsTracking) {
      const now = Date.now();
      const deltaSeconds = Math.floor((now - savedLastUpdate) / 1000);
      let simulatedFocused = 0;
      let simulatedDistracted = 0;

      for (let i = 0; i < deltaSeconds; i++) {
        if (Math.random() > 0.2) simulatedFocused++;
        else simulatedDistracted++;
      }

      setFocusedTime(savedFocused + simulatedFocused);
      setDistractedTime(savedDistracted + simulatedDistracted);
      localStorage.setItem(
        "focusedTime",
        (savedFocused + simulatedFocused).toString()
      );
      localStorage.setItem(
        "distractedTime",
        (savedDistracted + simulatedDistracted).toString()
      );
    } else {
      setFocusedTime(savedFocused);
      setDistractedTime(savedDistracted);
    }

    setIsTracking(savedIsTracking);
    setLastUpdate(Date.now());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTracking) {
      interval = setInterval(() => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          (tabs: any[]) => {
            if (tabs.length === 0) return;
            const url = new URL(tabs[0].url || "");
            const hostname = url.hostname.toLowerCase();

            const isDistracting = SOCIAL_MEDIA_DOMAINS.some((socialDomain) =>
              hostname.includes(socialDomain)
            );

            const siteData = JSON.parse(
              localStorage.getItem("siteData") || "{}"
            );

            if (!siteData[hostname]) {
              siteData[hostname] = {
                time: 0,
                type: isDistracting ? "distracted" : "focused",
              };
            }

            siteData[hostname].time++;

            if (siteData[hostname].type === "focused") {
              setFocusedTime((prev) => {
                const updated = prev + 1;
                localStorage.setItem("focusedTime", updated.toString());
                return updated;
              });
            } else {
              setDistractedTime((prev) => {
                const updated = prev + 1;
                localStorage.setItem("distractedTime", updated.toString());
                const randomNudge =
                  nudges[Math.floor(Math.random() * nudges.length)];
                setNudge(randomNudge);
                return updated;
              });
            }

            localStorage.setItem("siteData", JSON.stringify(siteData));
            localStorage.setItem("lastUpdate", `${Date.now()}`);

            console.clear();
            console.log("Current Site Tracking Data:", siteData);
          }
        );
      }, 1000);
    }

    localStorage.setItem("isTracking", isTracking.toString());

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking]);

  useEffect(() => {
    const totalTime = focusedTime + distractedTime;
    if (totalTime > 0) {
      setFocusPercentage(Math.round((focusedTime / totalTime) * 100));
    } else {
      setFocusPercentage(100);
    }
  }, [focusedTime, distractedTime]);

  const toggleTracking = () => {
    const newTrackingState = !isTracking;
    localStorage.setItem("isTracking", newTrackingState.toString());
    localStorage.setItem("lastUpdate", `${Date.now()}`);
    setIsTracking(newTrackingState);
  };

  function formatTime(seconds: number): import("react").ReactNode {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    } else if (m > 0) {
      return `${m}m ${s}s`;
    } else {
      return `${s}s`;
    }
  }

  return (
    <ThemeProvider>
      <div className="w-[300px] h-[400px] max-h-[500px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden flex flex-col text-base">
        {/* Header */}
        <div className="relative h-14 bg-gradient-to-r bg-background flex-shrink-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=60&width=300')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/20 dark:to-black/40"></div>
          <div className="absolute top-0 right-0 h-full flex items-center pr-2">
            <div className="flex items-center gap-1">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-background hover:bg-white/30 text-primary border border-white/10 p-1"
              >
                <a href="dashboard.html" target="_blank">
                  <Settings className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>

          <div className="absolute top-0 left-0 h-full flex items-center pl-2">
            <div className="flex items-center gap-1.5">
              <div className="bg-primary/20 backdrop-blur-md p-1 rounded-md">
                <Circle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-primary leading-tight">
                  MindSweep
                </h1>
                <p className="text-[10px] text-primary/80 leading-tight">
                  Focus Tracker
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {/* Status Badge */}
          <div className="flex justify-between items-center px-1">
            <div className="text-xs font-medium">Status</div>
            <Badge
              className={cn(
                "px-1.5 py-0.5 text-[10px] font-medium rounded-full",
                isTracking
                  ? "bg-green-600  text-primary"
                  : "bg-zinc-300 dark:bg-accent text-primary"
              )}
            >
              {isTracking ? "Tracking" : "Idle"}
            </Badge>
          </div>

          {/* Start/Stop Button */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={toggleTracking}
              className={cn(
                "w-full py-2 text-xs font-medium rounded-lg shadow-md transition-all duration-300",
                isTracking
                  ? "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              )}
            >
              <motion.div
                className="flex items-center gap-1"
                initial={false}
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 0.3,
                  repeat: isTracking ? 0 : Number.POSITIVE_INFINITY,
                  repeatDelay: 1.5,
                }}
              >
                {isTracking ? (
                  <>
                    <Pause className="h-3 w-3" /> Stop Tracking
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" /> Start Tracking
                  </>
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Focus Percentage */}
          <div className="space-y-1 px-1">
            <div className="flex justify-between items-center">
              <div className="text-[10px] font-medium">Focus Level</div>
              <div className="text-[10px] font-bold">{focusPercentage}%</div>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                key={focusPercentage} // <-- add this line
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
          <div className="grid grid-cols-2 gap-2">
            <motion.div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg p-2 border border-emerald-100 dark:border-emerald-800/40 shadow-sm">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="p-0.5 bg-emerald-100 dark:bg-emerald-800/30 rounded-full">
                  <Pointer className="h-2 w-2 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                  Focused
                </div>
              </div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                {formatTime(focusedTime)}
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/30 dark:to-red-900/30 rounded-lg p-2 border border-rose-100 dark:border-rose-800/40 shadow-sm">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="p-0.5 bg-rose-100 dark:bg-rose-800/30 rounded-full">
                  <AlertCircle className="h-2 w-2 text-rose-500 dark:text-rose-400" />
                </div>
                <div className="text-[10px] font-medium text-rose-700 dark:text-rose-300">
                  Distracted
                </div>
              </div>
              <div className="text-base font-bold text-rose-600 dark:text-rose-400">
                {formatTime(distractedTime)}
              </div>
            </motion.div>
          </div>

          {/* AI Nudge */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={nudge}
            className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 border "
          >
            <div className="flex items-center gap-1 mb-0.5">
              <div className="text-[10px] font-medium text-primary">
                AI based status
              </div>
            </div>
            <div className="text-[10px] bold text-slate-700 dark:text-slate-300">
              {nudge}
            </div>
          </motion.div>

          {/* Today's Stats */}
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-2 border border-slate-200 dark:border-slate-700/40">
            <div className="text-[10px] font-medium mb-1">Today's Stats</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-[10px]">
                <div className="text-slate-500 dark:text-slate-400">
                  Focus Ratio
                </div>
                <div className="font-bold">{focusPercentage}%</div>
              </div>
              <div className="text-[10px]">
                <div className="text-slate-500 dark:text-slate-400">
                  Total Time
                </div>
                <div className="font-bold">
                  {formatTime(focusedTime + distractedTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
