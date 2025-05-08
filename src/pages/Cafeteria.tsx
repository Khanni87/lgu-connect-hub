
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Coffee } from "lucide-react";

// Dummy cafeteria data
const cafeterias = [
  {
    id: 1,
    name: "Main Cafeteria",
    location: "Central Building, Ground Floor",
    hours: "Monday-Friday: 8:00 AM - 8:00 PM, Saturday: 9:00 AM - 5:00 PM",
    description: "The main dining facility serving a wide variety of meals, snacks, and beverages.",
    seatingCapacity: 200,
    facilities: ["Air Conditioning", "Wi-Fi", "Power Outlets", "TV Screens"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Engineering Block Café",
    location: "Engineering Building, First Floor",
    hours: "Monday-Friday: 8:30 AM - 6:00 PM",
    description: "A smaller café offering quick bites, coffee, and refreshments for engineering students.",
    seatingCapacity: 50,
    facilities: ["Air Conditioning", "Wi-Fi", "Power Outlets"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Library Café",
    location: "University Library, Second Floor",
    hours: "Monday-Saturday: 9:00 AM - 9:00 PM, Sunday: 10:00 AM - 6:00 PM",
    description: "A quiet café perfect for studying while enjoying coffee and light snacks.",
    seatingCapacity: 40,
    facilities: ["Air Conditioning", "Wi-Fi", "Power Outlets", "Study Tables"],
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

// Menu categories
const menuCategories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"];

// Dummy menu data
const menuItems = [
  // Breakfast items
  {
    id: 1,
    name: "Paratha Platter",
    price: 150,
    description: "Freshly made parathas served with yogurt and pickle",
    category: "Breakfast",
    available: true,
    vegetarian: true,
    popular: true
  },
  {
    id: 2,
    name: "Omelette with Toast",
    price: 120,
    description: "Two-egg omelette with toast and butter",
    category: "Breakfast",
    available: true,
    vegetarian: false,
    popular: true
  },
  {
    id: 3,
    name: "Halwa Puri",
    price: 180,
    description: "Traditional halwa with puris and chickpea curry",
    category: "Breakfast",
    available: true,
    vegetarian: true,
    popular: true
  },
  
  // Lunch items
  {
    id: 4,
    name: "Chicken Biryani",
    price: 200,
    description: "Aromatic rice dish with chicken and spices",
    category: "Lunch",
    available: true,
    vegetarian: false,
    popular: true
  },
  {
    id: 5,
    name: "Daal Chawal",
    price: 150,
    description: "Lentil curry served with steamed rice",
    category: "Lunch",
    available: true,
    vegetarian: true,
    popular: false
  },
  {
    id: 6,
    name: "Chicken Karahi",
    price: 350,
    description: "Spicy chicken curry with naan",
    category: "Lunch",
    available: true,
    vegetarian: false,
    popular: true
  },
  
  // Dinner items
  {
    id: 7,
    name: "Mix Vegetable Rice",
    price: 180,
    description: "Rice with mixed vegetables and light spices",
    category: "Dinner",
    available: true,
    vegetarian: true,
    popular: false
  },
  {
    id: 8,
    name: "Chicken Tikka",
    price: 280,
    description: "Grilled chicken tikka pieces with naan and salad",
    category: "Dinner",
    available: true,
    vegetarian: false,
    popular: true
  },
  
  // Snacks
  {
    id: 9,
    name: "Samosa",
    price: 30,
    description: "Crispy pastry filled with spiced potatoes and peas",
    category: "Snacks",
    available: true,
    vegetarian: true,
    popular: true
  },
  {
    id: 10,
    name: "Chicken Patties",
    price: 60,
    description: "Puff pastry filled with spicy chicken mince",
    category: "Snacks",
    available: true,
    vegetarian: false,
    popular: true
  },
  {
    id: 11,
    name: "French Fries",
    price: 120,
    description: "Crispy potato fries with ketchup",
    category: "Snacks",
    available: true,
    vegetarian: true,
    popular: true
  },
  
  // Beverages
  {
    id: 12,
    name: "Kashmiri Tea",
    price: 70,
    description: "Pink tea with cardamom and pistachios",
    category: "Beverages",
    available: true,
    vegetarian: true,
    popular: true
  },
  {
    id: 13,
    name: "Mango Shake",
    price: 120,
    description: "Fresh mango milkshake",
    category: "Beverages",
    available: true,
    vegetarian: true,
    popular: true
  },
  {
    id: 14,
    name: "Soft Drinks",
    price: 60,
    description: "Various carbonated beverages",
    category: "Beverages",
    available: true,
    vegetarian: true,
    popular: false
  },
  {
    id: 15,
    name: "Mineral Water",
    price: 40,
    description: "500ml bottled water",
    category: "Beverages",
    available: true,
    vegetarian: true,
    popular: false
  }
];

const Cafeteria = () => {
  const [selectedCafeteria, setSelectedCafeteria] = useState(cafeterias[0]);
  const [menuCategory, setMenuCategory] = useState("all");
  
  const filteredMenu = menuCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === menuCategory);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">LGU Cafeteria</h1>
        <p className="text-gray-600 max-w-3xl">
          Explore dining options, check menus, and find the perfect spot for meals on campus.
        </p>
      </div>
      
      {/* Cafeteria selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cafeterias.map(cafe => (
          <Card 
            key={cafe.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCafeteria.id === cafe.id ? 'border-2 border-lgu-purple' : ''
            }`}
            onClick={() => setSelectedCafeteria(cafe)}
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={cafe.image} 
                alt={cafe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{cafe.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Clock size={14} />
                <span>Open Now</span>
              </div>
              <p className="text-sm mt-2">{cafe.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Cafeteria details */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">{selectedCafeteria.name}</h2>
            <p className="text-gray-600 mb-4">{selectedCafeteria.description}</p>
            
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-medium">Location:</span> {selectedCafeteria.location}
              </div>
              <div>
                <span className="font-medium">Hours:</span> <br />
                <span className="text-sm">{selectedCafeteria.hours}</span>
              </div>
              <div>
                <span className="font-medium">Seating Capacity:</span> {selectedCafeteria.seatingCapacity}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Facilities:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCafeteria.facilities.map((facility, index) => (
                  <Badge key={index} variant="outline">{facility}</Badge>
                ))}
              </div>
            </div>
            
            <Button className="mt-2 w-full sm:w-auto">
              <Coffee className="mr-2 h-4 w-4" />
              View Current Occupancy
            </Button>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Menu</h3>
              
              <Tabs value={menuCategory} onValueChange={setMenuCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {menuCategories.map(category => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="mt-6 space-y-4">
                  {filteredMenu.map(item => (
                    <div 
                      key={item.id}
                      className="flex justify-between border-b pb-3 last:border-0 items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                          {item.vegetarian && <Badge variant="outline" className="text-xs">Vegetarian</Badge>}
                        </div>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">Rs. {item.price}</span>
                        <Button size="sm" variant="outline">Add</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cafeteria;
