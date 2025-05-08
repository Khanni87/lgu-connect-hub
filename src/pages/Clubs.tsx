
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dummy sports teams data
const sportsTeams = [
  {
    id: 1,
    name: "LGU Cricket Team",
    category: "Sports",
    members: 15,
    coach: "Mr. Ahmed Khan",
    achievements: ["Inter-University Champions 2024", "Regional Cup Runners-up 2023"],
    practice: "Monday, Wednesday, Friday (4:00 PM - 6:00 PM)",
    venue: "University Cricket Ground",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Open trials held at the beginning of each semester"
  },
  {
    id: 2,
    name: "LGU Football Team",
    category: "Sports",
    members: 22,
    coach: "Mr. Hassan Ali",
    achievements: ["Inter-University Tournament Semifinalists 2024"],
    practice: "Tuesday, Thursday, Saturday (4:30 PM - 6:30 PM)",
    venue: "University Football Ground",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Selection based on performance in trials"
  },
  {
    id: 3,
    name: "LGU Basketball Team",
    category: "Sports",
    members: 12,
    coach: "Ms. Sana Ahmed",
    achievements: ["City-wide Championship Winners 2023", "Inter-University League 2nd Place 2024"],
    practice: "Monday, Wednesday, Friday (5:00 PM - 7:00 PM)",
    venue: "University Sports Complex",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Open trials at the beginning of each semester"
  }
];

// Dummy clubs data
const clubs = [
  {
    id: 1,
    name: "LGU Literary Society",
    category: "Academic",
    members: 45,
    patron: "Dr. Fatima Shah",
    activities: ["Weekly Book Discussions", "Annual Literary Festival", "Creative Writing Workshops"],
    meetings: "Every Thursday (5:30 PM - 7:00 PM)",
    venue: "Humanities Block, Room H-4",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Open to all students"
  },
  {
    id: 2,
    name: "Coding Club",
    category: "Technical",
    members: 60,
    patron: "Prof. Imran Khan",
    activities: ["Hackathons", "Coding Competitions", "Technical Workshops"],
    meetings: "Every Friday (6:00 PM - 8:00 PM)",
    venue: "Computer Science Building, Lab 3",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Basic programming knowledge required"
  },
  {
    id: 3,
    name: "Dramatic Arts Society",
    category: "Cultural",
    members: 35,
    patron: "Ms. Ayesha Ahmed",
    activities: ["Theater Workshops", "Annual Drama Festival", "Acting Classes"],
    meetings: "Tuesday and Thursday (4:00 PM - 6:00 PM)",
    venue: "University Amphitheater",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Auditions held every semester"
  },
  {
    id: 4,
    name: "Entrepreneurship Club",
    category: "Professional",
    members: 50,
    patron: "Dr. Ahmed Raza",
    activities: ["Business Plan Competitions", "Networking Events", "Startup Weekends"],
    meetings: "Every Wednesday (5:00 PM - 6:30 PM)",
    venue: "Business School, Conference Room 2",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Open to all students"
  },
  {
    id: 5,
    name: "Photography Club",
    category: "Art",
    members: 30,
    patron: "Mr. Tariq Malik",
    activities: ["Photo Walks", "Photography Exhibitions", "Technical Workshops"],
    meetings: "Every Saturday (10:00 AM - 12:00 PM)",
    venue: "Fine Arts Department, Studio 3",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    joinEligibility: "Basic camera knowledge preferred but not required"
  }
];

// Combine both arrays and get unique categories
const allActivities = [...sportsTeams, ...clubs];
const categories = [...new Set(allActivities.map(item => item.category))];

const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filterItems = (items: typeof clubs) => {
    return items.filter(item => 
      (item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "" || item.category === categoryFilter)
    );
  };

  const filteredSports = filterItems(sportsTeams);
  const filteredClubs = filterItems(clubs);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sports & Clubs</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore extracurricular activities and find opportunities to develop skills, pursue interests, and connect with like-minded students.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search clubs and sports teams..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={categoryFilter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter("")}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs for Sports and Clubs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="sports">Sports Teams</TabsTrigger>
          <TabsTrigger value="clubs">Student Clubs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[...filteredSports, ...filteredClubs].map(item => (
              <ActivityCard key={`${item.category}-${item.id}`} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredSports.map(item => (
              <ActivityCard key={`sport-${item.id}`} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clubs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredClubs.map(item => (
              <ActivityCard key={`club-${item.id}`} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Activity card component
interface ActivityItem {
  id: number;
  name: string;
  category: string;
  members: number;
  coach?: string;
  patron?: string;
  achievements?: string[];
  activities?: string[];
  practice?: string;
  meetings?: string;
  venue: string;
  image: string;
  joinEligibility: string;
}

const ActivityCard = ({ item }: { item: ActivityItem }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <Badge variant="outline">{item.category}</Badge>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Users size={16} />
          <span>{item.members} members</span>
        </div>
        
        <div className="space-y-2 mb-4">
          {item.coach && <p><span className="font-medium">Coach:</span> {item.coach}</p>}
          {item.patron && <p><span className="font-medium">Faculty Patron:</span> {item.patron}</p>}
          <p><span className="font-medium">Venue:</span> {item.venue}</p>
          {item.practice && <p><span className="font-medium">Practice Schedule:</span> {item.practice}</p>}
          {item.meetings && <p><span className="font-medium">Meeting Schedule:</span> {item.meetings}</p>}
        </div>
        
        {item.achievements && item.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Recent Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {item.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        
        {item.activities && item.activities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Key Activities:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {item.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6">
          <p><span className="font-medium">How to Join:</span> {item.joinEligibility}</p>
          <Button className="w-full mt-4">Apply to Join</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Clubs;
