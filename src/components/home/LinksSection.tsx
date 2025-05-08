
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const LinksSection = () => {
  const portalLinks = [
    {
      title: "Student Portal",
      description: "Access your academic profile, grades, and course materials",
      url: "https://student.lgu.edu.pk",
      icon: "/placeholder.svg" // Placeholder for now
    },
    {
      title: "Faculty Portal",
      description: "For faculty members to manage courses and student records",
      url: "https://e.lgu.edu.pk",
      icon: "/placeholder.svg" // Placeholder for now
    },
    {
      title: "LMS Portal",
      description: "Access course materials, assignments, and participate in discussions",
      url: "#",
      icon: "/placeholder.svg" // Placeholder for now
    },
    {
      title: "Admissions Portal",
      description: "Apply for admission, check application status, and submit documents",
      url: "#",
      icon: "/placeholder.svg" // Placeholder for now
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Important Portals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portalLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-1 border-2 border-transparent group-hover:border-lgu-purple/20">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <img src={link.icon} alt={link.title} className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{link.title}</h3>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-lgu-purple transition-colors" />
                  </div>
                  <p className="text-gray-500 text-sm">{link.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
