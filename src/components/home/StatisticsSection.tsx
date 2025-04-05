
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data - in real application, this would come from the API
const statisticsData = {
  totalDonated: 125000,
  targetAmount: 200000,
  familiesHelped: 78,
  eventsOrganized: 24,
  pendingRequests: 17
};

const StatisticsSection = () => {
  const donationProgressPercent = (statisticsData.totalDonated / statisticsData.targetAmount) * 100;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Through the generosity of our donors and the dedication of our volunteers, 
            we've made significant progress in our mission.
          </p>
        </div>
        
        <div className="mb-12 animate-fade-in animate-delay-200">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl text-amana-primary">Donation Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${statisticsData.totalDonated.toLocaleString()}</span>
                  <span>Goal: ${statisticsData.targetAmount.toLocaleString()}</span>
                </div>
                <Progress value={donationProgressPercent} className="h-2 bg-gray-200" />
                <div className="text-sm text-right text-gray-600">
                  {donationProgressPercent.toFixed(1)}% Complete
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Families Supported" 
            value={statisticsData.familiesHelped} 
            icon="👪"
            description="Families received direct assistance"
            delay={300}
          />
          
          <StatCard 
            title="Events Organized" 
            value={statisticsData.eventsOrganized} 
            icon="🎁"
            description="Charity events successfully completed"
            delay={400}
          />
          
          <StatCard 
            title="Pending Requests" 
            value={statisticsData.pendingRequests} 
            icon="⏳"
            description="Families waiting for assistance"
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
  delay: number;
}

const StatCard = ({ title, value, icon, description, delay }: StatCardProps) => (
  <Card className={`animate-fade-in animate-delay-${delay} border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-amana-light`}>
    <CardHeader className="pb-2">
      <div className="text-3xl mb-1">{icon}</div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl md:text-4xl font-bold text-amana-primary mb-2">
        {value}
      </p>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default StatisticsSection;
