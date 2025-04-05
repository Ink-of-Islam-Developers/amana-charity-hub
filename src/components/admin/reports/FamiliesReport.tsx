
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
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type FamiliesReportProps = {
  dateRange: string;
};

// Sample data
const familyRegistrationTrend = [
  { name: "Week 1", newFamilies: 8, approvals: 5 },
  { name: "Week 2", newFamilies: 12, approvals: 9 },
  { name: "Week 3", newFamilies: 6, approvals: 8 },
  { name: "Week 4", newFamilies: 10, approvals: 7 },
];

const familyDistributionByNeeds = [
  { name: "Housing", families: 42 },
  { name: "Food", families: 85 },
  { name: "Medical", families: 60 },
  { name: "Education", families: 35 },
  { name: "Employment", families: 28 },
];

const topUrgentFamilies = [
  { id: 'F-1021', mainContactName: 'Ahmed Mohammed', members: 6, urgencyLevel: 'Critical', status: 'Approved' },
  { id: 'F-1015', mainContactName: 'Fatima Ali', members: 5, urgencyLevel: 'Critical', status: 'Approved' },
  { id: 'F-1032', mainContactName: 'Ibrahim Hassan', members: 7, urgencyLevel: 'Critical', status: 'Pending' },
  { id: 'F-1008', mainContactName: 'Zainab Omar', members: 4, urgencyLevel: 'High', status: 'Approved' },
  { id: 'F-1029', mainContactName: 'Khalid Abdi', members: 8, urgencyLevel: 'High', status: 'Approved' },
];

export const FamiliesReport = ({ dateRange }: FamiliesReportProps) => {
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
          <CardTitle>Family Registration Trend</CardTitle>
          <CardDescription>{getDateRangeLabel()} - New registrations vs. approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={familyRegistrationTrend}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newFamilies"
                  name="New Registrations"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="approvals"
                  name="Approvals"
                  stroke="#10b981"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Family Distribution by Needs</CardTitle>
            <CardDescription>Primary needs reported by families</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={familyDistributionByNeeds}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="families" name="Number of Families" fill="#8b5cf6" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Urgent Cases</CardTitle>
            <CardDescription>Top 5 families requiring immediate assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Main Contact</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topUrgentFamilies.map((family) => (
                  <TableRow key={family.id}>
                    <TableCell className="font-medium">{family.id}</TableCell>
                    <TableCell>{family.mainContactName}</TableCell>
                    <TableCell>{family.members}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        family.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                        family.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                        family.urgencyLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {family.urgencyLevel}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        family.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        family.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {family.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Family Statistics</CardTitle>
          <CardDescription>Key metrics for {getDateRangeLabel().toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Families</h3>
              <p className="text-3xl font-bold text-amana-primary">156</p>
              <p className="text-xs text-green-500">↑ 12% from last period</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-3xl font-bold text-green-600">129</p>
              <p className="text-xs text-green-500">82.7% approval rate</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">23</p>
              <p className="text-xs text-yellow-500">14.7% of total</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-3xl font-bold text-red-600">4</p>
              <p className="text-xs text-red-500">2.6% of total</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
