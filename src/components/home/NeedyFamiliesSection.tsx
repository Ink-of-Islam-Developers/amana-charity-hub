
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - in real application, this would come from the API
const needyFamilies = [
  {
    id: 1,
    name: "Tadesse Family",
    members: 5,
    location: "Addis Ababa",
    urgency: "High",
    needs: ["Medical Support", "Food", "Education"],
    story: "The Tadesse family lost their home in a recent fire. They have three young children and are currently staying with relatives in very crowded conditions."
  },
  {
    id: 2,
    name: "Kebede Family",
    members: 4,
    location: "Bahir Dar",
    urgency: "Medium",
    needs: ["Housing", "Job Opportunity"],
    story: "Single mother with three children struggling after losing her job. The eldest child has healthcare needs that require regular attention."
  },
  {
    id: 3,
    name: "Ahmed Family",
    members: 7,
    location: "Dire Dawa",
    urgency: "High",
    needs: ["Food", "Clothing", "Medical Support"],
    story: "Large family with elderly grandparents and young children. The main income earner recently suffered a workplace accident and cannot work."
  }
];

const NeedyFamiliesSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Families In Need</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These families are currently waiting for support. Your contributions can make a significant 
            difference in their lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {needyFamilies.map((family, index) => (
            <FamilyCard 
              key={family.id} 
              family={family} 
              delay={(index + 1) * 100}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center animate-fade-in">
          <Button className="bg-amana-secondary hover:bg-amana-primary">
            View All Families
          </Button>
        </div>
      </div>
    </section>
  );
};

interface FamilyCardProps {
  family: {
    id: number;
    name: string;
    members: number;
    location: string;
    urgency: string;
    needs: string[];
    story: string;
  };
  delay: number;
}

const FamilyCard = ({ family, delay }: FamilyCardProps) => {
  const urgencyColor = 
    family.urgency === "High" ? "destructive" : 
    family.urgency === "Medium" ? "default" : 
    "secondary";

  return (
    <Card className={`animate-fade-in animate-delay-${delay} hover:shadow-lg transition-shadow`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{family.name}</CardTitle>
          <Badge variant={urgencyColor}>{family.urgency} Urgency</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-gray-700">{family.story}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium">{family.location}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Family size:</span>
            <span className="font-medium">{family.members} members</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {family.needs.map((need) => (
              <Badge key={need} variant="outline" className="bg-amana-light border-amana-secondary text-amana-dark">
                {need}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-amana-primary text-amana-primary hover:bg-amana-light">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NeedyFamiliesSection;
