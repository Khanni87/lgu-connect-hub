
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            {/* These routes will be implemented in future iterations */}
            <Route path="/events" element={<div className="p-6">Events Calendar - Coming Soon</div>} />
            <Route path="/news" element={<div className="p-6">News & Announcements - Coming Soon</div>} />
            <Route path="/clubs" element={<div className="p-6">Sports & Clubs - Coming Soon</div>} />
            <Route path="/cafeteria" element={<div className="p-6">LGU Cafeteria - Coming Soon</div>} />
            <Route path="/jobs" element={<div className="p-6">Job Placement Portal - Coming Soon</div>} />
            <Route path="/campus-map" element={<div className="p-6">Campus Map - Coming Soon</div>} />
            <Route path="/library" element={<div className="p-6">Library Portal - Coming Soon</div>} />
            <Route path="/academic" element={<div className="p-6">Academic Calendar - Coming Soon</div>} />
            <Route path="/complaints" element={<div className="p-6">Complaint Box - Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
