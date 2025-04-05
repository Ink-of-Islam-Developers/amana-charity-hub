
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
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

type DonationsReportProps = {
  dateRange: string;
};

// Sample data
const donationTrends = [
  { name: "Jan", amount: 12400, donors: 78 },
  { name: "Feb", amount: 10800, donors: 65 },
  { name: "Mar", amount: 14200, donors: 85 },
  { name: "Apr", amount: 16100, donors: 95 },
  { name: "May", amount: 15300, donors: 88 },
  { name: "Jun", amount: 18500, donors: 102 },
  { name: "Jul", amount: 16800, donors: 90 },
  { name: "Aug", amount: 15700, donors: 85 },
  { name: "Sep", amount: 17900, donors: 98 },
  { name: "Oct", amount: 19200, donors: 110 },
  { name: "Nov", amount: 21400, donors: 125 },
  { name: "Dec", amount: 24500, donors: 140 },
];

const donationSourcesData = [
  { name: "Individual", value: 65, color: "#3b82f6" },
  { name: "Corporate", value: 20, color: "#8b5cf6" },
  { name: "NGO", value: 10, color: "#ec4899" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const donationPurposeData = [
  { name: "General Fund", value: 40, color: "#3b82f6" },
  { name: "Food Programs", value: 25, color: "#22c55e" },
  { name: "Medical Aid", value: 15, color: "#ef4444" },
  { name: "Education", value: 12, color: "#f59e0b" },
  { name: "Housing", value: 8, color: "#8b5cf6" },
];

const donationMethodData = [
  { name: "Credit Card", amount: 15200 },
  { name: "Bank Transfer", amount: 5800 },
  { name: "PayPal", amount: 2400 },
  { name: "Cash", amount: 1000 },
  { name: "Other", amount: 280 },
];

export const DonationsReport = ({ dateRange }: DonationsReportProps) => {
  const getDateRangeLabel = () => {
    switch(dateRange) {
      case 'thisMonth': return 'This Month';
      case 'lastMonth': return 'Last Month';
      case 'thisYear': return 'This Year';
      default: return 'Custom Range';
    }
  };

  // Filter data based on date range
  const getFilteredData = () => {
    if (dateRange === 'thisMonth') {
      return [donationTrends[donationTrends.length - 1]];
    } else if (dateRange === 'lastMonth') {
      return [donationTrends[donationTrends.length - 2]];
    } else if (dateRange === 'thisYear') {
      return donationTrends;
    }
    return donationTrends;
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Donation Amount Trends</CardTitle>
          <CardDescription>{getDateRangeLabel()} - Donation amounts and donor count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  yAxisId="left"
                  orientation="left"
                  stroke="#3b82f6"
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#10b981"
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'amount') return [`$${Number(value).toLocaleString()}`, 'Amount'];
                    return [value, 'Donors'];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="amount"
                  name="Donation Amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="donors"
                  name="Donor Count"
                  stroke="#10b981"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Donation Sources</CardTitle>
            <CardDescription>Where donations come from</CardDescription>
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
            <CardTitle>Donation Purpose</CardTitle>
            <CardDescription>How donations are allocated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donationPurposeData}
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
                    {donationPurposeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {donationPurposeData.map((item) => (
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
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>How donors contribute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={donationMethodData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} 
                  />
                  <Bar dataKey="amount" name="Amount" fill="#3b82f6" barSize={12} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Statistics</CardTitle>
          <CardDescription>Key metrics for {getDateRangeLabel().toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Donations</h3>
              <p className="text-3xl font-bold text-amana-primary">$24,680</p>
              <p className="text-xs text-green-500">↑ 16% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Donors</h3>
              <p className="text-3xl font-bold text-blue-600">140</p>
              <p className="text-xs text-green-500">↑ 12% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Average Donation</h3>
              <p className="text-3xl font-bold text-purple-600">$85</p>
              <p className="text-xs text-green-500">↑ 5% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Recurring Donors</h3>
              <p className="text-3xl font-bold text-green-600">42</p>
              <p className="text-xs text-green-500">30% of total donors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
