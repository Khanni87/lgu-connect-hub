
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

// Dummy events data
const events = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "2025-04-15T10:00:00",
    location: "Main Auditorium",
    type: "Seminar",
    registrationRequired: true
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "2025-04-22T09:00:00",
    location: "University Convention Center",
    type: "Career",
    registrationRequired: true
  },
  {
    id: 3,
    title: "Arts & Culture Festival",
    date: "2025-05-05T15:00:00",
    location: "Campus Lawn",
    type: "Cultural",
    registrationRequired: false
  },
  {
    id: 4,
    title: "Research Symposium",
    date: "2025-05-18T13:30:00",
    location: "Engineering Block",
    type: "Academic",
    registrationRequired: true
  }
];

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleString('en-US', options);
};

const EventsPreview = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link to="/events">
            <Button variant="outline">View Full Calendar</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-lgu-purple/10 rounded-lg text-lgu-purple">
                    <Calendar size={24} />
                    <span className="text-xs font-semibold mt-1">
                      {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{formatEventDate(event.date)}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-50">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                <Link to={`/events/${event.id}`}>
                  <Button variant="link" className="px-0">View Details</Button>
                </Link>
                {event.registrationRequired && (
                  <Link to={`/events/${event.id}/register`}>
                    <Button variant="default" size="sm">Register</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
