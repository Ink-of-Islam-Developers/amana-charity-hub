
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type EventsReportProps = {
  dateRange: string;
};

// Sample data
const eventAttendanceData = [
  { name: "Monthly Food Distribution", attendance: 120, capacity: 150 },
  { name: "Medical Checkup Camp", attendance: 75, capacity: 100 },
  { name: "Job Fair", attendance: 90, capacity: 120 },
  { name: "Children's Education", attendance: 45, capacity: 60 },
  { name: "Winter Clothing Drive", attendance: 200, capacity: 250 },
];

const eventTypeData = [
  { name: "Food Aid", value: 45, color: "#22c55e" },
  { name: "Medical", value: 25, color: "#3b82f6" },
  { name: "Job Support", value: 15, color: "#8b5cf6" },
  { name: "Education", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const upcomingEvents = [
  { id: 'E-1034', title: 'Monthly Food Distribution', date: '2025-04-15', type: 'Food Aid', attendees: 0, capacity: 150 },
  { id: 'E-1035', title: 'Medical Checkup Camp', date: '2025-04-19', type: 'Medical', attendees: 0, capacity: 100 },
  { id: 'E-1036', title: 'Job Fair', date: '2025-04-25', type: 'Job Support', attendees: 0, capacity: 120 },
];

export const EventsReport = ({ dateRange }: EventsReportProps) => {
  const getDateRangeLabel = () => {
    switch(dateRange) {
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'thisYear': return 'This Year';
      default: return 'Custom Range';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Attendance vs. Capacity</CardTitle>
          <CardDescription>{getDateRangeLabel()} - Past events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={eventAttendanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end"
                  height={70}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="attendance" 
                  name="Attendance" 
                  fill="#3b82f6" 
                  barSize={20} 
                />
                <Bar 
                  dataKey="capacity" 
                  name="Capacity" 
                  fill="#d1d5db" 
                  barSize={20} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypeData}
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
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {eventTypeData.map((item) => (
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
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.type === 'Food Aid' ? 'bg-green-100 text-green-800' :
                        event.type === 'Medical' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Job Support' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'Education' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type}
                      </span>
                    </TableCell>
                    <TableCell>{event.capacity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Statistics</CardTitle>
          <CardDescription>Key metrics for {getDateRangeLabel().toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Events</h3>
              <p className="text-3xl font-bold text-amana-primary">12</p>
              <p className="text-xs text-red-500">↓ 5% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Attendance</h3>
              <p className="text-3xl font-bold text-blue-600">780</p>
              <p className="text-xs text-green-500">↑ 8% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Avg. Attendance</h3>
              <p className="text-3xl font-bold text-purple-600">65</p>
              <p className="text-xs text-green-500">↑ 12% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Capacity Utilization</h3>
              <p className="text-3xl font-bold text-green-600">82%</p>
              <p className="text-xs text-green-500">↑ 5% from last period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
