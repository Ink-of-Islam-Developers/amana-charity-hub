
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - in real application, this would come from the API
const events = [
  {
    id: 1,
    title: "Food Package Distribution",
    date: "2023-05-15T10:00:00",
    location: "Community Center, Addis Ababa",
    category: "food",
    description: "Distribution of essential food packages to 50 families in the local community.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    id: 2,
    title: "Medical Camp",
    date: "2023-05-20T09:00:00",
    location: "Health Center, Bahir Dar",
    category: "medical",
    description: "Free medical check-ups and medicine distribution for children and elderly.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 3,
    title: "Job Fair for Unemployed",
    date: "2023-05-25T11:00:00",
    location: "Conference Hall, Dire Dawa",
    category: "jobs",
    description: "Connecting job seekers with potential employers. Bring your resume and be ready for on-site interviews.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 4,
    title: "Emergency Food Relief",
    date: "2023-06-01T10:00:00",
    location: "Community Park, Hawassa",
    category: "food",
    description: "Emergency food relief for families affected by recent floods in the region.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  }
];

const UpcomingEventsSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us at these upcoming charity events to support our community and make a difference.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="animate-fade-in animate-delay-200">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="food">Food Packages</TabsTrigger>
              <TabsTrigger value="medical">Medical Aid</TabsTrigger>
              <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <EventGrid events={events} />
          </TabsContent>
          
          <TabsContent value="food">
            <EventGrid events={events.filter(event => event.category === 'food')} />
          </TabsContent>
          
          <TabsContent value="medical">
            <EventGrid events={events.filter(event => event.category === 'medical')} />
          </TabsContent>
          
          <TabsContent value="jobs">
            <EventGrid events={events.filter(event => event.category === 'jobs')} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center animate-fade-in">
          <Button className="bg-amana-secondary hover:bg-amana-primary">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

interface EventGridProps {
  events: {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    image: string;
  }[];
}

const EventGrid = ({ events }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No events in this category yet.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event, index) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        });
        
        return (
          <Card key={event.id} className={`overflow-hidden hover:shadow-lg transition-shadow animate-fade-in animate-delay-${(index + 2) * 100}`}>
            <div className="relative h-48">
              <img 
                src={event.image} 
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <CategoryBadge category={event.category} />
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <h3 className="font-bold text-lg line-clamp-2">{event.title}</h3>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-500">
                <strong>Date:</strong> {formattedDate} at {formattedTime}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {event.description}
              </p>
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" className="w-full border-amana-primary text-amana-primary hover:bg-amana-light">
                Event Details
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

const CategoryBadge = ({ category }: { category: string }) => {
  const categoryConfig = {
    food: { label: 'Food Package', color: 'bg-green-100 text-green-800' },
    medical: { label: 'Medical Aid', color: 'bg-blue-100 text-blue-800' },
    jobs: { label: 'Job Opportunity', color: 'bg-purple-100 text-purple-800' },
  };
  
  const config = categoryConfig[category as keyof typeof categoryConfig] || 
    { label: category, color: 'bg-gray-100 text-gray-800' };
  
  return (
    <span className={`${config.color} text-xs font-medium px-2.5 py-1 rounded`}>
      {config.label}
    </span>
  );
};

export default UpcomingEventsSection;
