
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

// Sample events data
const events = [
  {
    id: 1,
    title: "Food Package Distribution",
    type: "food",
    date: "2025-04-15",
    time: "10:00 AM - 2:00 PM",
    location: "Addis Ababa Community Center",
    description: "Monthly distribution of food packages to registered families in need.",
    image: "https://images.unsplash.com/photo-1615473967657-9dc21654b6e9",
    attendees: 120,
  },
  {
    id: 2,
    title: "Medical Checkup Camp",
    type: "medical",
    date: "2025-04-22",
    time: "9:00 AM - 4:00 PM",
    location: "St. Paul's Hospital",
    description: "Free medical checkups including basic tests, consultations, and medicine distribution.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b7e00",
    attendees: 85,
  },
  {
    id: 3,
    title: "Job Skills Workshop",
    type: "jobs",
    date: "2025-04-28",
    time: "1:00 PM - 5:00 PM",
    location: "Amana Education Center",
    description: "Workshop teaching essential job skills including resume writing, interview techniques, and vocational training.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    attendees: 45,
  },
  {
    id: 4,
    title: "Emergency Food Aid",
    type: "food",
    date: "2025-05-05",
    time: "8:00 AM - 12:00 PM",
    location: "Merkato Market Area",
    description: "Distribution of emergency food packages to families affected by recent economic hardships.",
    image: "https://images.unsplash.com/photo-1593113598332-cd59a0c3015c",
    attendees: 200,
  },
  {
    id: 5,
    title: "Children's Health Day",
    type: "medical",
    date: "2025-05-12",
    time: "10:00 AM - 3:00 PM",
    location: "Yekatit 12 Hospital",
    description: "Pediatric health check-ups, vaccinations, and nutrition counseling for children under 10.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842",
    attendees: 150,
  },
];

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.type === activeTab);

  return (
    <section className="py-16 bg-gradient-to-b from-amana-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amana-dark mb-4">Our Events</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Browse our upcoming charity events and join us in making a difference in our community.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="food">Food Aid</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="jobs">Job Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-amana-dark">{event.title}</h3>
                      <Badge variant="outline" className="bg-amana-light text-amana-primary border-amana-primary">
                        {event.type === "food" ? "Food Aid" : event.type === "medical" ? "Medical" : "Job Support"}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-amana-primary" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-amana-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-amana-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-amana-primary" />
                        <span>{event.attendees} Expected Attendees</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-amana-primary hover:bg-amana-dark">Learn More</Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No events found for this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EventsSection;
