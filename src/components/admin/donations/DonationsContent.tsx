
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationsList from "./DonationsList";
import DonationsChart from "./DonationsChart";

const DonationsContent = () => {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Donations Management</h1>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">All Donations</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Donations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-full">
              <div className="bg-white p-5 rounded-lg shadow-sm mb-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Donation Trends</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setPeriod("week")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "week" 
                          ? "bg-amana-primary text-white" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Week
                    </button>
                    <button 
                      onClick={() => setPeriod("month")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "month" 
                          ? "bg-amana-primary text-white" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Month
                    </button>
                    <button 
                      onClick={() => setPeriod("year")}
                      className={`px-3 py-1 text-sm rounded-md ${
                        period === "year" 
                          ? "bg-amana-primary text-white" 
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Year
                    </button>
                  </div>
                </div>
                <DonationsChart period={period} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Total Donations</h3>
              <p className="text-3xl font-bold text-amana-primary">$24,680</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500">↑ 16%</span> from last month
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Average Donation</h3>
              <p className="text-3xl font-bold text-amana-primary">$85</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500">↑ 5%</span> from last month
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">New Donors</h3>
              <p className="text-3xl font-bold text-amana-primary">37</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-500">↑ 12%</span> from last month
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold p-5 border-b">Recent Donations</h3>
            <DonationsList limit={5} showViewAll={true} />
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="bg-white rounded-lg shadow-sm">
            <DonationsList />
          </div>
        </TabsContent>
        
        <TabsContent value="recurring">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Recurring Donations</h3>
            <DonationsList recurring={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationsContent;
