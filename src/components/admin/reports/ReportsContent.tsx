
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ReportsSummary } from "./ReportsSummary";
import { FamiliesReport } from "./FamiliesReport";
import { DonationsReport } from "./DonationsReport";
import { EventsReport } from "./EventsReport";

const ReportsContent = () => {
  const [dateRange, setDateRange] = useState<"thisMonth" | "lastMonth" | "thisYear" | "custom">("thisMonth");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="px-3 py-2 bg-white border rounded-md text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <Button className="flex items-center gap-2">
            <Download size={16} />
            Export Reports
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="families">Families</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <ReportsSummary dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="families">
          <FamiliesReport dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="donations">
          <DonationsReport dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsReport dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsContent;
