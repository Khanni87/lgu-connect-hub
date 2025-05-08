
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Book, Calendar, Home, FileText, Users, 
  Coffee, Briefcase, Archive, Map, Library,
  MessageSquare, Settings
} from "lucide-react";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const NavItem = ({ to, icon, label, isCollapsed, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive ? "bg-lgu-purple/10 text-lgu-purple font-medium" : "text-gray-700 hover:bg-lgu-purple/5 hover:text-lgu-purple"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

type SidebarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isCollapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/projects", icon: <FileText size={20} />, label: "Projects" },
    { to: "/events", icon: <Calendar size={20} />, label: "Events" },
    { to: "/news", icon: <Archive size={20} />, label: "News" },
    { to: "/clubs", icon: <Users size={20} />, label: "Sports & Clubs" },
    { to: "/cafeteria", icon: <Coffee size={20} />, label: "Cafeteria" },
    { to: "/jobs", icon: <Briefcase size={20} />, label: "Jobs" },
    { to: "/campus-map", icon: <Map size={20} />, label: "Campus Map" },
    { to: "/library", icon: <Library size={20} />, label: "Library" },
    { to: "/academic", icon: <Book size={20} />, label: "Academic" },
    { to: "/complaints", icon: <MessageSquare size={20} />, label: "Complaints" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" }
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full p-2">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
              isActive={pathname === item.to}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
