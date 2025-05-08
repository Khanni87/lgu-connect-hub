
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy events data
const eventsData = [
  {
    id: 1,
    title: "Technology Fair 2025",
    date: "2025-06-10",
    time: "09:00 - 17:00",
    location: "University Main Hall",
    category: "Academic",
    description: "Annual technology exhibition showcasing student projects and innovations from all departments.",
    organizer: "Computer Science Department",
    capacity: 500,
    registrationDeadline: "2025-06-05"
  },
  {
    id: 2,
    title: "Guest Lecture: AI Ethics",
    date: "2025-06-15",
    time: "14:00 - 16:00",
    location: "Auditorium Block C",
    category: "Seminar",
    description: "Distinguished lecture by Prof. Aisha Khan on ethical considerations in artificial intelligence development.",
    organizer: "Philosophy Department",
    capacity: 200,
    registrationDeadline: "2025-06-12"
  },
  {
    id: 3,
    title: "Annual Sports Day",
    date: "2025-06-20",
    time: "08:00 - 18:00",
    location: "University Sports Complex",
    category: "Sports",
    description: "University-wide sports competition featuring cricket, football, basketball, and athletics events.",
    organizer: "Sports Department",
    capacity: 1000,
    registrationDeadline: "2025-06-15"
  },
  {
    id: 4,
    title: "Career Networking Session",
    date: "2025-06-25",
    time: "13:00 - 17:00",
    location: "Business School Conference Hall",
    category: "Career",
    description: "Networking event with industry professionals from leading companies offering internship and job opportunities.",
    organizer: "Career Development Office",
    capacity: 300,
    registrationDeadline: "2025-06-22"
  },
  {
    id: 5,
    title: "Cultural Evening: Heritage Night",
    date: "2025-07-01",
    time: "18:00 - 22:00",
    location: "University Amphitheater",
    category: "Cultural",
    description: "Annual cultural show celebrating the diverse heritage of our student body with music, dance, and theatrical performances.",
    organizer: "Student Affairs Office",
    capacity: 600,
    registrationDeadline: "2025-06-28"
  }
];

// Sort events by date (nearest first)
const sortedEvents = [...eventsData].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Events = () => {
  const [view, setView] = useState<"table" | "cards">("cards");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Events Calendar</h1>
        <p className="text-gray-600 max-w-3xl">
          Stay updated with all university events. Register early to secure your spot at workshops, seminars, cultural activities, and sporting events.
        </p>
      </div>

      {/* View toggle */}
      <div className="flex justify-end gap-2">
        <Button 
          variant={view === "cards" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setView("cards")}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Card View
        </Button>
        <Button 
          variant={view === "table" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setView("table")}
        >
          <Table className="h-4 w-4 mr-2" />
          Table View
        </Button>
      </div>

      {view === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Registration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {formatDate(event.date)}
                    <br />
                    <span className="text-gray-500 text-sm">{event.time}</span>
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm">Register</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline">{event.category}</Badge>
                <Badge variant="secondary">{event.date < new Date().toISOString().split('T')[0] ? "Past" : "Upcoming"}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Register by: {event.registrationDeadline}</span>
                <Button>Register Now</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
