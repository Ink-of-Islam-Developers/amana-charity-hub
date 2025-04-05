
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ReportsSummaryProps = {
  dateRange: string;
};

// Sample data
const overviewData = {
  totalFamilies: 156,
  familiesGrowth: 12,
  activeFamilies: 132,
  totalDonations: 24680,
  donationsGrowth: 16,
  averageDonation: 85,
  totalEvents: 12,
  eventsGrowth: -5,
  eventsAttendance: 780,
};

const monthlyTrendsData = [
  {
    name: "Jan",
    families: 110,
    donations: 15000,
    events: 8,
  },
  {
    name: "Feb",
    families: 120,
    donations: 18000,
    events: 9,
  },
  {
    name: "Mar",
    families: 130,
    donations: 20000,
    events: 10,
  },
  {
    name: "Apr",
    families: 156,
    donations: 24680,
    events: 12,
  },
];

const familyUrgencyData = [
  { name: "Critical", value: 32, color: "#ef4444" },
  { name: "High", value: 48, color: "#f97316" },
  { name: "Medium", value: 56, color: "#eab308" },
  { name: "Low", value: 20, color: "#22c55e" },
];

const donationSourcesData = [
  { name: "Individual", value: 65, color: "#3b82f6" },
  { name: "Corporate", value: 20, color: "#8b5cf6" },
  { name: "NGO", value: 10, color: "#ec4899" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const eventTypesData = [
  { name: "Food Aid", value: 45, color: "#22c55e" },
  { name: "Medical", value: 25, color: "#3b82f6" },
  { name: "Job Support", value: 15, color: "#8b5cf6" },
  { name: "Education", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

export const ReportsSummary = ({ dateRange }: ReportsSummaryProps) => {
  const [selectedMetric, setSelectedMetric] = useState<"families" | "donations" | "events">("families");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`cursor-pointer ${selectedMetric === 'families' ? 'border-amana-primary' : ''}`} onClick={() => setSelectedMetric('families')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Families</CardTitle>
            <CardDescription>Total registered families</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overviewData.totalFamilies}</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className={`${overviewData.familiesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {overviewData.familiesGrowth >= 0 ? '↑' : '↓'} {Math.abs(overviewData.familiesGrowth)}%
              </span>
              {' '}from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${selectedMetric === 'donations' ? 'border-amana-primary' : ''}`} onClick={() => setSelectedMetric('donations')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Donations</CardTitle>
            <CardDescription>Total donation amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${overviewData.totalDonations.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className={`${overviewData.donationsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {overviewData.donationsGrowth >= 0 ? '↑' : '↓'} {Math.abs(overviewData.donationsGrowth)}%
              </span>
              {' '}from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer ${selectedMetric === 'events' ? 'border-amana-primary' : ''}`} onClick={() => setSelectedMetric('events')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Events</CardTitle>
            <CardDescription>Total events organized</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{overviewData.totalEvents}</div>
            <div className="text-sm text-muted-foreground mt-2">
              <span className={`${overviewData.eventsGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {overviewData.eventsGrowth >= 0 ? '↑' : '↓'} {Math.abs(overviewData.eventsGrowth)}%
              </span>
              {' '}from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>
            {dateRange === 'thisMonth' ? 'This month\'s' : 
             dateRange === 'lastMonth' ? 'Last month\'s' : 
             dateRange === 'thisYear' ? 'This year\'s' : 'Custom range'} data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyTrendsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  stroke="#3b82f6"
                  tickFormatter={(value) => selectedMetric === 'donations' ? `$${value/1000}k` : `${value}`}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'donations') return [`$${Number(value).toLocaleString()}`, 'Donations'];
                    if (name === 'families') return [value, 'Families'];
                    return [value, 'Events'];
                  }}
                />
                <Legend />
                {selectedMetric === 'families' && (
                  <Bar yAxisId="left" dataKey="families" fill="#3b82f6" name="Families" />
                )}
                {selectedMetric === 'donations' && (
                  <Bar yAxisId="left" dataKey="donations" fill="#8b5cf6" name="Donations" />
                )}
                {selectedMetric === 'events' && (
                  <Bar yAxisId="left" dataKey="events" fill="#f59e0b" name="Events" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Family Urgency Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={familyUrgencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight="bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {familyUrgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} families`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {familyUrgencyData.map((item) => (
                <div key={item.name} className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Donation Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donationSourcesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight="bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {donationSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {donationSourcesData.map((item) => (
                <div key={item.name} className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight="bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {eventTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {eventTypesData.map((item) => (
                <div key={item.name} className="flex items-center text-sm">
                  <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
