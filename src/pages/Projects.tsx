
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
import { Search, Download, Eye } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";

// Expanded projects data
const projectsData = [
  {
    id: 1,
    title: "Smart Campus Surveillance System",
    department: "Computer Science",
    year: "2024",
    summary: "A facial recognition based smart surveillance system for enhancing campus security with real-time monitoring and alerts.",
    students: ["Ahmed Ali", "Fatima Khan"],
    supervisor: "Dr. Imran Shah",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Renewable Energy Integration for University Buildings",
    department: "Electrical Engineering",
    year: "2023",
    summary: "A project focused on integrating solar panels and energy efficient systems in university buildings to reduce carbon footprint.",
    students: ["Zainab Malik", "Hassan Mahmood"],
    supervisor: "Prof. Asma Khalid",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Automated Library Management System",
    department: "Software Engineering",
    year: "2024",
    summary: "A comprehensive solution for library management including book tracking, member management, and fine calculation.",
    students: ["Ali Raza", "Sana Tariq"],
    supervisor: "Dr. Naveed Ahmed",
    downloadAvailable: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    title: "Impact of Social Media on Student Academic Performance",
    department: "Social Sciences",
    year: "2023",
    summary: "A research study analyzing how social media usage patterns affect the academic performance of university students.",
    students: ["Usman Khan", "Ayesha Siddiqui"],
    supervisor: "Dr. Rabia Shafiq",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    title: "IoT-based Smart Parking System",
    department: "Computer Engineering",
    year: "2022",
    summary: "An Internet of Things solution that helps students find available parking spots on campus through a mobile application.",
    students: ["Bilal Hassan", "Maham Zaidi"],
    supervisor: "Dr. Khalid Mehmood",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 6,
    title: "Virtual Reality Tour of LGU Campus",
    department: "Interactive Media Design",
    year: "2024",
    summary: "A VR application that offers prospective students an immersive 360° tour of the university campus and facilities.",
    students: ["Sara Ahmed", "Faisal Rehman"],
    supervisor: "Prof. Nadia Malik",
    downloadAvailable: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 7,
    title: "Blockchain-based Academic Credential Verification",
    department: "Computer Science",
    year: "2023",
    summary: "A secure system using blockchain technology to verify and authenticate academic credentials and transcripts.",
    students: ["Omar Farooq", "Hina Batool"],
    supervisor: "Dr. Saad Azhar",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 8,
    title: "AI-powered Student Mental Health Support System",
    department: "Psychology",
    year: "2024",
    summary: "An artificial intelligence application designed to provide initial mental health support and resources to students in need.",
    students: ["Taimoor Ali", "Sadia Khan"],
    supervisor: "Dr. Fariha Hayat",
    downloadAvailable: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 9,
    title: "Eco-friendly Water Conservation System for Campus",
    department: "Environmental Science",
    year: "2022",
    summary: "A comprehensive water management and conservation system to reduce wastage and promote sustainable practices on campus.",
    students: ["Kamran Akhtar", "Nadia Iqbal"],
    supervisor: "Prof. Zahid Mahmood",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 10,
    title: "Mobile App for Course Registration and Timetable",
    department: "Software Engineering",
    year: "2023",
    summary: "A user-friendly mobile application that streamlines course registration, scheduling, and provides personalized timetables.",
    students: ["Hamza Sheikh", "Faiza Malik"],
    supervisor: "Dr. Adnan Akbar",
    downloadAvailable: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80"
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
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  
  // Filter projects based on search query and filters
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === "" || project.department === departmentFilter;
    const matchesYear = yearFilter === "" || project.year === yearFilter;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleDownload = (project) => {
    if (project.downloadAvailable) {
      toast({
        title: "Download started",
        description: `${project.title} report is being downloaded.`,
      });
    }
  };

  const handleViewProject = (project) => {
    toast({
      title: "Project details",
      description: `Viewing detailed information for ${project.title}.`,
    });
  };

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
        {currentProjects.length > 0 ? (
          currentProjects.map((project) => (
            <Card key={project.id} className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex gap-4">
                  <div className="hidden md:block w-24 h-24 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={project.thumbnailUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                    <CardDescription className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{project.department}</Badge>
                      <Badge variant="secondary">{project.year}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{project.summary}</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Students:</span> {project.students.join(", ")}</p>
                  <p><span className="font-semibold">Supervisor:</span> {project.supervisor}</p>
                </div>
              </CardContent>
              
              <CardFooter className="pt-4 flex gap-2">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProject(project)}
                >
                  <Eye className="mr-2 h-4 w-4" /> 
                  View Details
                </Button>
                <Button 
                  variant={project.downloadAvailable ? "default" : "outline"}
                  disabled={!project.downloadAvailable}
                  className="flex-1"
                  onClick={() => handleDownload(project)}
                >
                  <Download className="mr-2 h-4 w-4" /> 
                  {project.downloadAvailable ? "Download" : "Unavailable"}
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

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Projects;
