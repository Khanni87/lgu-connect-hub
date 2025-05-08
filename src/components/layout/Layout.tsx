
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <main 
          className={cn(
            "flex-1 transition-all duration-300 pt-4 pb-12", 
            isCollapsed ? "ml-16" : "ml-64"
          )}
        >
          <div className="container px-4 mx-auto">
            {/* Toggle sidebar button */}
            <Button
              variant="outline"
              size="icon"
              className="fixed left-0 top-1/2 z-40 -mt-12 bg-white rounded-r-md rounded-l-none h-24 border-l-0"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
            
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
