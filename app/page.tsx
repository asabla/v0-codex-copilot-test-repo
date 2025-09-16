"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  FileText,
  Clock,
  CheckCircle,
  Activity,
  Database,
  Zap,
  Users,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Settings,
} from "lucide-react";
import { useState, useEffect } from "react";

// Utility functions for generating streaming/dynamic data
const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate initial data
const generateQueueData = () => [
  { name: "Mon", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Tue", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Wed", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Thu", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Fri", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Sat", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
  { name: "Sun", pending: randomInRange(30, 60), processing: randomInRange(5, 20), completed: randomInRange(70, 110), failed: randomInRange(1, 6) },
];

const generateTokenUsageData = () => [
  { time: "00:00", input: randomInRange(1000, 1500), output: randomInRange(600, 1000) },
  { time: "04:00", input: randomInRange(1500, 2000), output: randomInRange(1000, 1400) },
  { time: "08:00", input: randomInRange(2000, 2800), output: randomInRange(1300, 1800) },
  { time: "12:00", input: randomInRange(2800, 3500), output: randomInRange(1800, 2300) },
  { time: "16:00", input: randomInRange(2500, 3200), output: randomInRange(1600, 2100) },
  { time: "20:00", input: randomInRange(2000, 2600), output: randomInRange(1200, 1700) },
];

const generateProcessingStages = () => {
  const total = 100;
  const ingestion = randomInRange(20, 35);
  const chunking = randomInRange(15, 25);
  const embedding = randomInRange(25, 40);
  const indexing = total - ingestion - chunking - embedding;
  
  return [
    { name: "Ingestion", value: ingestion, color: "var(--chart-1)" },
    { name: "Chunking", value: chunking, color: "var(--chart-2)" },
    { name: "Embedding", value: embedding, color: "var(--chart-3)" },
    { name: "Indexing", value: Math.max(0, indexing), color: "var(--chart-4)" },
  ];
};

const generateRequestMetrics = () => [
  { time: "00:00", requests: randomInRange(30, 60), latency: randomInRange(100, 150) },
  { time: "04:00", requests: randomInRange(20, 45), latency: randomInRange(80, 120) },
  { time: "08:00", requests: randomInRange(60, 90), latency: randomInRange(120, 160) },
  { time: "12:00", requests: randomInRange(80, 110), latency: randomInRange(140, 180) },
  { time: "16:00", requests: randomInRange(70, 100), latency: randomInRange(120, 160) },
  { time: "20:00", requests: randomInRange(50, 80), latency: randomInRange(90, 130) },
];

export default function RAGDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Streaming data state
  const [queueData, setQueueData] = useState(() => generateQueueData());
  const [tokenUsageData, setTokenUsageData] = useState(() => generateTokenUsageData());
  const [processingStages, setProcessingStages] = useState(() => generateProcessingStages());
  const [requestMetrics, setRequestMetrics] = useState(() => generateRequestMetrics());
  
  // Key metrics state
  const [documentsInQueue, setDocumentsInQueue] = useState(1247);
  const [processingRate, setProcessingRate] = useState(94.2);
  const [tokenUsage, setTokenUsage] = useState(2.4);
  const [activeRequests, setActiveRequests] = useState(87);
  const [highPriorityCount, setHighPriorityCount] = useState(3);
  
  // System metrics state
  const [cpuUsage, setCpuUsage] = useState(67);
  const [memoryUsage, setMemoryUsage] = useState(84);
  const [storageUsage, setStorageUsage] = useState(45);
  
  // Handle client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update clock every second
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // Stream data updates every 3 seconds
  useEffect(() => {
    if (!mounted) return;
    const streamingTimer = setInterval(() => {
      // Update key metrics with small random changes
      setDocumentsInQueue(prev => Math.max(1000, prev + randomInRange(-50, 50)));
      setProcessingRate(prev => Math.max(85, Math.min(99, prev + randomFloat(-2, 2))));
      setTokenUsage(prev => Math.max(1.5, prev + randomFloat(-0.3, 0.3)));
      setActiveRequests(prev => Math.max(50, prev + randomInRange(-10, 10)));
      setHighPriorityCount(prev => Math.max(0, Math.min(10, prev + randomInRange(-2, 2))));
      
      // Update system metrics
      setCpuUsage(prev => Math.max(40, Math.min(95, prev + randomInRange(-5, 5))));
      setMemoryUsage(prev => Math.max(60, Math.min(95, prev + randomInRange(-3, 3))));
      setStorageUsage(prev => Math.max(30, Math.min(80, prev + randomInRange(-2, 2))));
      
      // Update chart data less frequently (every other update)
      if (Math.random() > 0.5) {
        setQueueData(generateQueueData());
        setTokenUsageData(generateTokenUsageData());
        setProcessingStages(generateProcessingStages());
        setRequestMetrics(generateRequestMetrics());
      }
    }, 3000);

    return () => clearInterval(streamingTimer);
  }, [mounted]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Force refresh all data
    setQueueData(generateQueueData());
    setTokenUsageData(generateTokenUsageData());
    setProcessingStages(generateProcessingStages());
    setRequestMetrics(generateRequestMetrics());
    
    setDocumentsInQueue(randomInRange(1000, 1500));
    setProcessingRate(randomFloat(90, 98));
    setTokenUsage(randomFloat(2, 3));
    setActiveRequests(randomInRange(70, 100));
    setHighPriorityCount(randomInRange(1, 8));
    
    setCpuUsage(randomInRange(50, 85));
    setMemoryUsage(randomInRange(70, 90));
    setStorageUsage(randomInRange(35, 65));
    
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  // Show static content until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border bg-card">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">RAG Pipeline Monitor</h1>
              </div>
              <Badge variant="secondary" className="text-xs animate-pulse">
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Loading...</span>
              <Button variant="outline" size="sm" disabled>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </header>
        <div className="p-6">
          <div className="text-center text-muted-foreground">
            Initializing streaming dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">RAG Pipeline Monitor</h1>
            </div>
            <Badge variant="secondary" className="text-xs animate-pulse">
              Live
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {currentTime.toLocaleTimeString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents in Queue
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2 transition-all duration-500">
                {documentsInQueue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Rate
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1 transition-all duration-500">
                {processingRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                Success rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Token Usage</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-5 transition-all duration-500">
                {tokenUsage.toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                <Clock className="inline h-3 w-3 mr-1" />
                Today&apos;s consumption
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Requests
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4 transition-all duration-500">
                {activeRequests}
              </div>
              <p className="text-xs text-muted-foreground">
                <AlertTriangle className="inline h-3 w-3 mr-1" />
                {highPriorityCount} high priority
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Queue Status */}
          <Card>
            <CardHeader>
              <CardTitle>Document Queue Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={queueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="pending" stackId="a" fill="var(--chart-2)" />
                  <Bar dataKey="processing" stackId="a" fill="var(--chart-5)" />
                  <Bar dataKey="completed" stackId="a" fill="var(--chart-1)" />
                  <Bar dataKey="failed" stackId="a" fill="var(--chart-3)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Token Usage Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Token Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={tokenUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="input"
                    stackId="1"
                    stroke="var(--chart-1)"
                    fill="var(--chart-1)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="output"
                    stackId="1"
                    stroke="var(--chart-5)"
                    fill="var(--chart-5)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Processing Pipeline & Request Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Processing Pipeline Stages */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={processingStages}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {processingStages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {processingStages.map((stage, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="text-sm">{stage.name}</span>
                    </div>
                    <span className="text-sm font-medium">{stage.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Request Metrics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Request Metrics & Latency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={requestMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="var(--muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="requests"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-1)" }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="latency"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={{ fill: "var(--chart-3)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-muted-foreground">{cpuUsage}%</span>
                </div>
                <Progress value={cpuUsage} className="h-2 transition-all duration-700" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-muted-foreground">{memoryUsage}%</span>
                </div>
                <Progress value={memoryUsage} className="h-2 transition-all duration-700" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">{storageUsage}%</span>
                </div>
                <Progress value={storageUsage} className="h-2 transition-all duration-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
