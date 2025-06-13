"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  BarChart3,
  Settings,
  Bell,
  Clock,
  Zap,
  AlertCircle,
  PieChart,
  Sliders,
  Globe,
  MessageSquare,
} from "lucide-react";
// import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  //   PieChart as RePieChart,
  //   Pie,
  //   Cell,
  BarChart,
  Bar,
} from "recharts";
import { ModeToggle } from "@/components/mode-toggle";

// Sample data for charts
const weeklyFocusData = [
  { day: "Mon", focused: 120, distracted: 30 },
  { day: "Tue", focused: 150, distracted: 40 },
  { day: "Wed", focused: 180, distracted: 45 },
  { day: "Thu", focused: 135, distracted: 60 },
  { day: "Fri", focused: 190, distracted: 25 },
  { day: "Sat", focused: 80, distracted: 20 },
  { day: "Sun", focused: 60, distracted: 15 },
];

const hourlyFocusData = [
  { hour: "9AM", focus: 85 },
  { hour: "10AM", focus: 90 },
  { hour: "11AM", focus: 75 },
  { hour: "12PM", focus: 60 },
  { hour: "1PM", focus: 65 },
  { hour: "2PM", focus: 80 },
  { hour: "3PM", focus: 85 },
  { hour: "4PM", focus: 70 },
  { hour: "5PM", focus: 65 },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [blockingEnabled, setBlockingEnabled] = useState(true);
  const [focusGoal, setFocusGoal] = useState(120);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 dark:opacity-30 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-400 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-emerald-400 dark:bg-emerald-900 rounded-full filter blur-3xl opacity-20 dark:opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600 p-2 rounded-xl">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400">
                MindSweep
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dashboard & Settings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle/>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Today's Focus Time
                </p>
                <h3 className="text-2xl font-bold">02:45:18</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> 15% above average
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Focus Ratio
                </p>
                <h3 className="text-2xl font-bold">78%</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> 8% improvement
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Distractions
                </p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> 5 from social media
                </p>
              </div>
              <div className="h-12 w-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px] mx-auto">
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1">
              <Brain className="h-4 w-4" /> AI Insights
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            {/* Weekly Focus Chart */}
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Weekly Focus</CardTitle>
                    <CardDescription>
                      Your focus and distraction time this week
                    </CardDescription>
                  </div>
                  <Select defaultValue="week">
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyFocusData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.1}
                      />
                      <XAxis
                        dataKey="day"
                        stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                      />
                      <YAxis
                        stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor:
                            theme === "dark" ? "#1e293b" : "#ffffff",
                          borderColor: theme === "dark" ? "#334155" : "#e2e8f0",
                          color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                        }}
                      />
                      <Legend />
                      <Bar
                        name="Focused (min)"
                        dataKey="focused"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        fillOpacity={theme === "dark" ? 0.8 : 1}
                      />
                      <Bar
                        name="Distracted (min)"
                        dataKey="distracted"
                        fill="#f43f5e"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                        fillOpacity={theme === "dark" ? 0.8 : 1}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Focus Trends and Distractions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hourly Focus Trend */}
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Focus Trend</CardTitle>
                  <CardDescription>
                    Your focus level throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={hourlyFocusData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorFocus"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8b5cf6"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8b5cf6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#374151"
                          opacity={0.1}
                        />
                        <XAxis
                          dataKey="hour"
                          stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                        />
                        <YAxis
                          stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor:
                              theme === "dark" ? "#1e293b" : "#ffffff",
                            borderColor:
                              theme === "dark" ? "#334155" : "#e2e8f0",
                            color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="focus"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#colorFocus)"
                          name="Focus %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Distraction Sources */}
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Distraction Sources</CardTitle>
                  <CardDescription>What's breaking your focus</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" /> Focus Summary
                </CardTitle>
                <CardDescription>Weekly performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Your Week</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-emerald-500 rounded-full" />{" "}
                        Total focus: 14h 32m
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-amber-500 rounded-full" />{" "}
                        Avg session: 32m
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-rose-500 rounded-full" />{" "}
                        Most distracted: Thursday
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />{" "}
                        Most productive: Wednesday
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Full Report
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" /> AI
                  Suggestions
                </CardTitle>
                <CardDescription>Small wins, smarter focus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    title: "Schedule Optimization",
                    color: "blue",
                    text: "Best focus: 9–11AM. Prioritize key tasks then.",
                  },
                  {
                    title: "Distraction Management",
                    color: "emerald",
                    text: "Block social apps during morning sessions.",
                  },
                  {
                    title: "Focus Technique",
                    color: "amber",
                    text: "Use Pomodoro: 25 min work / 5 min break.",
                  },
                ].map(({ title, color, text }) => (
                  <div
                    key={title}
                    className={`bg-${color}-50 dark:bg-${color}-900/20 p-3 rounded-lg border border-${color}-100 dark:border-${color}-800/30`}
                  >
                    <h4
                      className={`font-medium text-sm text-${color}-700 dark:text-${color}-300 mb-1`}
                    >
                      {title}
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-500" /> Notifications
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Receive alerts about your focus status
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="distraction-alerts" className="text-sm">
                      Distraction Alerts
                    </Label>
                    <Switch id="distraction-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="focus-milestones" className="text-sm">
                      Focus Milestones
                    </Label>
                    <Switch id="focus-milestones" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="daily-summary" className="text-sm">
                      Daily Summary
                    </Label>
                    <Switch id="daily-summary" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" /> Website Blocking
                </CardTitle>
                <CardDescription>Manage distracting websites</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="website-blocking">
                      Enable Website Blocking
                    </Label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Block distracting websites during focus time
                    </p>
                  </div>
                  <Switch
                    id="website-blocking"
                    checked={blockingEnabled}
                    onCheckedChange={setBlockingEnabled}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm">Blocked Websites</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800"
                    >
                      facebook.com{" "}
                      <button className="ml-1 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800"
                    >
                      twitter.com{" "}
                      <button className="ml-1 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800"
                    >
                      instagram.com{" "}
                      <button className="ml-1 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800"
                    >
                      reddit.com{" "}
                      <button className="ml-1 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Enter website URL"
                      className="h-8 text-xs"
                    />
                    <Button variant="outline" size="sm" className="h-8">
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-white/20 dark:border-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-emerald-500" /> Focus Goals
                </CardTitle>
                <CardDescription>
                  Set and manage your daily focus targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="focus-goal">
                      Daily Focus Goal (minutes)
                    </Label>
                    <span className="text-sm font-medium">{focusGoal} min</span>
                  </div>
                  <Slider
                    id="focus-goal"
                    min={30}
                    max={480}
                    step={15}
                    value={[focusGoal]}
                    onValueChange={(value) => setFocusGoal(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>30m</span>
                    <span>4h</span>
                    <span>8h</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm">Focus Schedule</Label>
                  <Select defaultValue="workday">
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workday">Workday (9AM-5PM)</SelectItem>
                      <SelectItem value="morning">
                        Morning Focus (6AM-12PM)
                      </SelectItem>
                      <SelectItem value="evening">
                        Evening Focus (6PM-10PM)
                      </SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
