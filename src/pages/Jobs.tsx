
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Calendar, Building, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dummy job listings
const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechSolutions Ltd.",
    location: "Lahore",
    type: "Full-time",
    category: "IT & Software",
    deadline: "2025-06-15",
    postedDate: "2025-05-01",
    salary: "Rs. 80,000 - 120,000",
    description: "We are looking for a skilled Software Engineer to join our development team. The ideal candidate will have experience in web development using modern JavaScript frameworks.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "2+ years of experience in software development",
      "Proficiency in JavaScript, React, and Node.js",
      "Experience with database design and SQL",
      "Strong problem-solving skills"
    ],
    aboutCompany: "TechSolutions Ltd. is a leading software development company specializing in enterprise solutions."
  },
  {
    id: 2,
    title: "Marketing Executive",
    company: "BrandMasters",
    location: "Lahore",
    type: "Full-time",
    category: "Marketing & Communications",
    deadline: "2025-06-20",
    postedDate: "2025-05-03",
    salary: "Rs. 60,000 - 80,000",
    description: "We are seeking a creative and data-driven Marketing Executive to join our growing team. The successful candidate will assist in developing and implementing marketing strategies.",
    requirements: [
      "Bachelor's degree in Marketing, Business, or related field",
      "1-2 years of experience in marketing",
      "Strong communication and creative writing skills",
      "Knowledge of social media platforms and analytics",
      "Basic graphic design skills"
    ],
    aboutCompany: "BrandMasters is a creative marketing agency working with national and international clients."
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataInsights Co.",
    location: "Remote",
    type: "Internship",
    category: "Data Science",
    deadline: "2025-06-10",
    postedDate: "2025-05-02",
    salary: "Rs. 25,000 - 35,000",
    description: "Looking for a data analyst intern to help with data processing, analysis, and visualization. Perfect opportunity for students looking to gain practical experience.",
    requirements: [
      "Currently pursuing a degree in Computer Science, Statistics, or related field",
      "Knowledge of SQL and data visualization tools",
      "Proficiency in Excel and basic statistical analysis",
      "Good analytical and problem-solving skills",
      "Familiarity with Python or R is a plus"
    ],
    aboutCompany: "DataInsights Co. helps businesses make data-driven decisions through advanced analytics solutions."
  },
  {
    id: 4,
    title: "Electrical Engineer",
    company: "PowerTech Industries",
    location: "Islamabad",
    type: "Full-time",
    category: "Engineering",
    deadline: "2025-06-25",
    postedDate: "2025-05-04",
    salary: "Rs. 90,000 - 130,000",
    description: "We are looking for an experienced Electrical Engineer to design and develop electrical systems and components.",
    requirements: [
      "Bachelor's or Master's degree in Electrical Engineering",
      "3+ years of experience in electrical design",
      "Knowledge of CAD software and simulation tools",
      "Experience with power systems and control circuits",
      "Good project management and communication skills"
    ],
    aboutCompany: "PowerTech Industries is a leading company in power generation and distribution solutions."
  },
  {
    id: 5,
    title: "Research Assistant",
    company: "Lahore Garrison University",
    location: "Lahore",
    type: "Part-time",
    category: "Education & Research",
    deadline: "2025-06-05",
    postedDate: "2025-04-28",
    salary: "Rs. 40,000 - 50,000",
    description: "Seeking a Research Assistant to support faculty in conducting research, literature reviews, and data analysis.",
    requirements: [
      "Bachelor's degree in relevant field",
      "Strong research and analytical skills",
      "Proficiency in academic writing",
      "Ability to work independently and as part of a team",
      "Good time management and organizational skills"
    ],
    aboutCompany: "Lahore Garrison University is a premier educational institution committed to academic excellence and research."
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Creative Solutions",
    location: "Hybrid",
    type: "Full-time",
    category: "Design",
    deadline: "2025-06-18",
    postedDate: "2025-05-05",
    salary: "Rs. 70,000 - 100,000",
    description: "We are looking for a talented UI/UX Designer to create intuitive and engaging user interfaces for web and mobile applications.",
    requirements: [
      "Bachelor's degree in Design, Computer Science, or related field",
      "2+ years of experience in UI/UX design",
      "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design skills",
      "Knowledge of user-centered design principles"
    ],
    aboutCompany: "Creative Solutions is a digital agency specializing in web and mobile application development."
  }
];

// Get unique categories and job types for filters
const categories = [...new Set(jobListings.map(job => job.category))];
const jobTypes = [...new Set(jobListings.map(job => job.type))];
const locations = [...new Set(jobListings.map(job => job.location))];

// Format date function
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Calculate days left until deadline
const daysUntil = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const differenceInTime = deadlineDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof jobListings[0] | null>(null);
  
  // Filter job listings
  const filteredJobs = jobListings.filter(job => 
    (job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     job.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === "" || job.category === categoryFilter) &&
    (typeFilter === "" || job.type === typeFilter) &&
    (locationFilter === "" || job.location === locationFilter)
  );
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Job Placement Portal</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore job opportunities, internships, and career resources exclusively available for LGU students and alumni.
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search jobs by title or company..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Job listings and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job listings */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
            </div>
            
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div 
                    key={job.id} 
                    className={`p-4 cursor-pointer transition hover:bg-gray-50 ${
                      selectedJob?.id === job.id ? 'bg-gray-50 border-l-4 border-lgu-purple' : ''
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{job.title}</h3>
                      <Badge variant={job.type === "Internship" ? "secondary" : "outline"}>
                        {job.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500">{job.company}</p>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{daysUntil(job.deadline)} days left</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No jobs found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("");
                      setTypeFilter("");
                      setLocationFilter("");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Job details */}
        <div className="lg:col-span-2">
          {selectedJob ? (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Building size={16} className="text-gray-500" />
                    <span>{selectedJob.company}</span>
                  </div>
                </div>
                <Badge variant={selectedJob.type === "Internship" ? "secondary" : "outline"}>
                  {selectedJob.type}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Location</span>
                  <span className="font-medium">{selectedJob.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Salary</span>
                  <span className="font-medium">{selectedJob.salary}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Application Deadline</span>
                  <span className="font-medium">{formatDate(selectedJob.deadline)}</span>
                </div>
              </div>
              
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="pt-4">
                  <p className="text-gray-700">{selectedJob.description}</p>
                </TabsContent>
                
                <TabsContent value="requirements" className="pt-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="company" className="pt-4">
                  <p className="text-gray-700">{selectedJob.aboutCompany}</p>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-4 mt-8">
                <Button className="flex-1">Apply Now</Button>
                <Button variant="outline">Save Job</Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border p-8 text-center h-full flex items-center justify-center">
              <div>
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a job listing</h3>
                <p className="text-gray-500">
                  Click on a job from the list to view its details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Career resources section */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Career Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-medium mb-2">Resume Building Workshop</h3>
            <p className="text-sm text-gray-500 mb-3">Learn how to create an effective resume that stands out to employers.</p>
            <Button variant="outline" size="sm">Register</Button>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-medium mb-2">Mock Interview Sessions</h3>
            <p className="text-sm text-gray-500 mb-3">Practice your interview skills with industry professionals.</p>
            <Button variant="outline" size="sm">Book Session</Button>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-medium mb-2">Career Counseling</h3>
            <p className="text-sm text-gray-500 mb-3">Get personalized advice on career paths and job search strategies.</p>
            <Button variant="outline" size="sm">Schedule Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
