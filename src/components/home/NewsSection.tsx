
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dummy news data
const newsItems = [
  {
    id: 1,
    title: "Spring Semester Registration Now Open",
    description: "Registration for the Spring 2025 semester is now open. Students are advised to register by March 15th.",
    date: "2025-02-25",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Annual Sports Gala Announced",
    description: "LGU's annual sports gala will be held from April 5-10. Registration for various sports events now open.",
    date: "2025-03-01",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Alumni Networking Event",
    description: "Join us for an evening of networking with LGU alumni working in various industry sectors.",
    date: "2025-03-15",
    category: "Events",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const NewsSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest News & Announcements</h2>
          <Link to="/news">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="mt-auto pt-0">
                <Link to={`/news/${item.id}`}>
                  <Button variant="link" className="px-0">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
