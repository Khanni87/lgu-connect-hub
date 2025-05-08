
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download } from "lucide-react";

// Dummy projects data
const projectsData = [
  {
    id: 1,
    title: "Smart Campus Surveillance System",
    department: "Computer Science",
    year: "2024",
    summary: "A facial recognition based smart surveillance system for enhancing campus security with real-time monitoring and alerts.",
    students: ["Ahmed Ali", "Fatima Khan"],
    supervisor: "Dr. Imran Shah",
    downloadAvailable: true
  },
  {
    id: 2,
    title: "Renewable Energy Integration for University Buildings",
    department: "Electrical Engineering",
    year: "2023",
    summary: "A project focused on integrating solar panels and energy efficient systems in university buildings to reduce carbon footprint.",
    students: ["Zainab Malik", "Hassan Mahmood"],
    supervisor: "Prof. Asma Khalid",
    downloadAvailable: true
  },
  {
    id: 3,
    title: "Automated Library Management System",
    department: "Software Engineering",
    year: "2024",
    summary: "A comprehensive solution for library management including book tracking, member management, and fine calculation.",
    students: ["Ali Raza", "Sana Tariq"],
    supervisor: "Dr. Naveed Ahmed",
    downloadAvailable: false
  },
  {
    id: 4,
    title: "Impact of Social Media on Student Academic Performance",
    department: "Social Sciences",
    year: "2023",
    summary: "A research study analyzing how social media usage patterns affect the academic performance of university students.",
    students: ["Usman Khan", "Ayesha Siddiqui"],
    supervisor: "Dr. Rabia Shafiq",
    downloadAvailable: true
  },
  {
    id: 5,
    title: "IoT-based Smart Parking System",
    department: "Computer Engineering",
    year: "2022",
    summary: "An Internet of Things solution that helps students find available parking spots on campus through a mobile application.",
    students: ["Bilal Hassan", "Maham Zaidi"],
    supervisor: "Dr. Khalid Mehmood",
    downloadAvailable: true
  },
  {
    id: 6,
    title: "Virtual Reality Tour of LGU Campus",
    department: "Interactive Media Design",
    year: "2024",
    summary: "A VR application that offers prospective students an immersive 360° tour of the university campus and facilities.",
    students: ["Sara Ahmed", "Faisal Rehman"],
    supervisor: "Prof. Nadia Malik",
    downloadAvailable: false
  }
];

// Get unique departments for filter
const departments = [...new Set(projectsData.map(project => project.department))];
// Get unique years for filter
const years = [...new Set(projectsData.map(project => project.year))];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  
  // Filter projects based on search query and filters
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === "" || project.department === departmentFilter;
    const matchesYear = yearFilter === "" || project.year === yearFilter;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Final Year Projects Repository</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore previous final year projects from various departments. 
          Search by title, apply filters, and download available project reports.
        </p>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Projects list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{project.department}</Badge>
                      <Badge variant="secondary">{project.year}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{project.summary}</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Students:</span> {project.students.join(", ")}</p>
                  <p><span className="font-semibold">Supervisor:</span> {project.supervisor}</p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={project.downloadAvailable ? "default" : "outline"}
                  disabled={!project.downloadAvailable}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" /> 
                  {project.downloadAvailable ? "Download Project Report" : "Report Not Available"}
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No projects found matching your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setDepartmentFilter("");
                setYearFilter("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
