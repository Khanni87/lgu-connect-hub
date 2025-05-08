
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Dummy news data
const newsData = [
  {
    id: 1,
    title: "LGU Ranked Among Top 10 Universities in the Country",
    date: "2025-05-05",
    category: "Achievement",
    content: "Lahore Garrison University has been ranked among the top 10 universities in the country according to the latest Higher Education Commission (HEC) rankings. The university's commitment to academic excellence, research, and innovation has been recognized with this prestigious ranking.",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "New Research Collaboration with International Universities",
    date: "2025-04-28",
    category: "Research",
    content: "LGU has established new research collaborations with leading universities from the United States, United Kingdom, and China. These partnerships will facilitate joint research projects, faculty exchange programs, and access to advanced research facilities.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Fall 2025 Admission Applications Now Open",
    date: "2025-05-01",
    category: "Admissions",
    content: "Applications for Fall 2025 admissions are now being accepted. Prospective students can apply online through the university portal. The deadline for submitting applications is July 15, 2025. Merit scholarships are available for outstanding applicants.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "New Smart Campus Initiative Launched",
    date: "2025-04-15",
    category: "Campus",
    content: "LGU has launched a new Smart Campus Initiative aimed at integrating technology into campus operations. The initiative includes smart classrooms, IoT-based facility management, and a comprehensive digital transformation of academic and administrative processes.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    title: "LGU Students Win National Innovation Competition",
    date: "2025-04-10",
    category: "Achievement",
    content: "A team of LGU Computer Science students has won the National Innovation Competition with their project on AI-powered healthcare solutions. The team will represent Pakistan at the International Innovation Summit in Singapore next month.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    title: "Faculty Research Grants Announced",
    date: "2025-03-25",
    category: "Research",
    content: "The Office of Research has announced new research grants for faculty members. The grants aim to support innovative research projects across all disciplines. Applications are open until June 30, 2025.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

// Get unique categories
const categories = [...new Set(newsData.map(item => item.category))];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const filteredNews = newsData
    .filter(item => 
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "" || item.category === categoryFilter)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">News & Announcements</h1>
        <p className="text-gray-600 max-w-3xl">
          Stay updated with the latest news, announcements, and achievements at Lahore Garrison University.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search news..."
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

      {/* News grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredNews.length > 0 ? (
          filteredNews.map(item => (
            <article key={item.id} className="border rounded-lg overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{item.content}</p>
                <Button variant="link" className="self-end px-0">Read Full Story</Button>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No news items found matching your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("");
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

export default News;
