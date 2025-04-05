
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DonationsChartProps = {
  period: "week" | "month" | "year";
};

// Sample data
const weeklyData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 900 },
  { name: 'Wed', amount: 1500 },
  { name: 'Thu', amount: 800 },
  { name: 'Fri', amount: 2000 },
  { name: 'Sat', amount: 1800 },
  { name: 'Sun', amount: 1300 },
];

const monthlyData = [
  { name: 'Week 1', amount: 5400 },
  { name: 'Week 2', amount: 4800 },
  { name: 'Week 3', amount: 6200 },
  { name: 'Week 4', amount: 8300 },
];

const yearlyData = [
  { name: 'Jan', amount: 12400 },
  { name: 'Feb', amount: 10800 },
  { name: 'Mar', amount: 14200 },
  { name: 'Apr', amount: 16100 },
  { name: 'May', amount: 15300 },
  { name: 'Jun', amount: 18500 },
  { name: 'Jul', amount: 16800 },
  { name: 'Aug', amount: 15700 },
  { name: 'Sep', amount: 17900 },
  { name: 'Oct', amount: 19200 },
  { name: 'Nov', amount: 21400 },
  { name: 'Dec', amount: 24500 },
];

const DonationsChart = ({ period }: DonationsChartProps) => {
  let data;
  
  switch (period) {
    case 'week':
      data = weeklyData;
      break;
    case 'month':
      data = monthlyData;
      break;
    case 'year':
      data = yearlyData;
      break;
    default:
      data = monthlyData;
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            labelFormatter={(value) => `${value}`}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
            }}
          />
          <Bar 
            dataKey="amount" 
            fill="#4F6BED" 
            radius={[4, 4, 0, 0]}
            barSize={period === 'year' ? 30 : 40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationsChart;
