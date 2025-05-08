
import { Link } from "react-router-dom";
import { 
  Book, FileText, Calendar, Users, 
  Coffee, Briefcase, Map, Library
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Final Year Projects",
    description: "Browse previous student projects",
    icon: <FileText size={24} />,
    link: "/projects",
    color: "bg-blue-500",
  },
  {
    title: "Events Calendar",
    description: "Stay updated on campus events",
    icon: <Calendar size={24} />,
    link: "/events",
    color: "bg-green-500",
  },
  {
    title: "Sports & Clubs",
    description: "Join extracurricular activities",
    icon: <Users size={24} />,
    link: "/clubs",
    color: "bg-yellow-500",
  },
  {
    title: "LGU Cafeteria",
    description: "View menu and operating hours",
    icon: <Coffee size={24} />,
    link: "/cafeteria",
    color: "bg-orange-500",
  },
  {
    title: "Job Placement",
    description: "Find career opportunities",
    icon: <Briefcase size={24} />,
    link: "/jobs",
    color: "bg-red-500",
  },
  {
    title: "Campus Map",
    description: "Navigate the university campus",
    icon: <Map size={24} />,
    link: "/campus-map",
    color: "bg-indigo-500",
  },
  {
    title: "Library Portal",
    description: "Access books and resources",
    icon: <Library size={24} />,
    link: "/library",
    color: "bg-purple-500",
  },
  {
    title: "Academic Calendar",
    description: "View important academic dates",
    icon: <Book size={24} />,
    link: "/academic",
    color: "bg-pink-500",
  },
];

const FeaturedServices = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link to={service.link} key={index}>
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white mb-4", service.color)}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
