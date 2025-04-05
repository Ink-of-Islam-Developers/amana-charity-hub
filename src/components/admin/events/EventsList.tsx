
import { useState, useEffect } from "react";
import { Calendar, Edit, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Food Aid' | 'Medical' | 'Job Support' | 'Education' | 'Other';
  description: string;
  attendees: number;
};

type EventsListProps = {
  filter: "upcoming" | "past" | "all";
};

const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Monthly Food Distribution",
    date: "2025-04-15",
    time: "10:00 AM",
    location: "Community Center",
    type: "Food Aid",
    description: "Monthly food package distribution for registered families",
    attendees: 120
  },
  {
    id: 2,
    title: "Medical Checkup Camp",
    date: "2025-04-10",
    time: "9:00 AM",
    location: "Health Clinic",
    type: "Medical",
    description: "Free medical checkup for vulnerable families",
    attendees: 75
  },
  {
    id: 3,
    title: "Job Fair",
    date: "2025-04-25",
    time: "11:00 AM",
    location: "Conference Hall",
    type: "Job Support",
    description: "Connecting needy families with potential employers",
    attendees: 90
  },
  {
    id: 4,
    title: "Children's Education Workshop",
    date: "2025-03-20",
    time: "2:00 PM",
    location: "Public Library",
    type: "Education",
    description: "Free educational resources and tutoring",
    attendees: 45
  },
  {
    id: 5,
    title: "Winter Clothing Drive",
    date: "2025-03-05",
    time: "9:00 AM",
    location: "Amana Center",
    type: "Other",
    description: "Distribution of warm clothes for winter",
    attendees: 200
  }
];

const EventsList = ({ filter }: EventsListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    // In a real app, you would fetch from API
    const today = new Date();
    let filteredEvents = [...sampleEvents];
    
    if (filter === "upcoming") {
      filteredEvents = sampleEvents.filter(event => new Date(event.date) >= today);
    } else if (filter === "past") {
      filteredEvents = sampleEvents.filter(event => new Date(event.date) < today);
    }
    
    setEvents(filteredEvents);
  }, [filter]);

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      // In a real app, you would call an API
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search events..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>List of {filter} events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      event.type === 'Food Aid' ? 'bg-green-100 text-green-800' :
                      event.type === 'Medical' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'Job Support' ? 'bg-purple-100 text-purple-800' :
                      event.type === 'Education' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }
                  >
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell>{event.attendees}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(event)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No events found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{selectedEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsList;
