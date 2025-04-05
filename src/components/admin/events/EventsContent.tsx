
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsList from "./EventsList";
import AddEventForm from "./AddEventForm";

const EventsContent = () => {
  const [activeView, setActiveView] = useState<"list" | "add">("list");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <Button 
          onClick={() => setActiveView(activeView === "list" ? "add" : "list")}
          className="flex items-center gap-2"
        >
          {activeView === "list" ? (
            <>
              <Plus size={16} />
              Add New Event
            </>
          ) : (
            <>
              <Calendar size={16} />
              View Events List
            </>
          )}
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="all">All Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {activeView === "list" ? (
            <EventsList filter="upcoming" />
          ) : (
            <AddEventForm onSuccess={() => setActiveView("list")} />
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {activeView === "list" ? (
            <EventsList filter="past" />
          ) : (
            <AddEventForm onSuccess={() => setActiveView("list")} />
          )}
        </TabsContent>
        
        <TabsContent value="all">
          {activeView === "list" ? (
            <EventsList filter="all" />
          ) : (
            <AddEventForm onSuccess={() => setActiveView("list")} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsContent;
