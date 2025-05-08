
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-lgu-light-purple/10 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-lgu-purple">LGU Connect</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Your comprehensive digital hub for Lahore Garrison University services, resources and opportunities. All in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://student.lgu.edu.pk" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                Student Portal
              </Button>
            </a>
            <Link to="/admissions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Students at university"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
