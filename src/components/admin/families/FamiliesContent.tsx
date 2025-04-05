
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import FamiliesList from "./FamiliesList";
import AddFamilyForm from "./AddFamilyForm";
import { toast } from "sonner";

export type FamilyMember = {
  id: number;
  name: string;
  age: number;
  relation: string;
};

export type Family = {
  id: number;
  mainContactName: string;
  phoneNumber: string;
  address: string;
  members: FamilyMember[];
  urgencyLevel: "low" | "medium" | "high" | "critical";
  needsDescription: string;
  registrationDate: string;
  status: "pending" | "approved" | "receiving-aid" | "completed";
  documents: string[];
  monthlyIncome: number;
};

const FamiliesContent = () => {
  const [families, setFamilies] = useState<Family[]>([
    {
      id: 1,
      mainContactName: "Abebe Kebede",
      phoneNumber: "0911223344",
      address: "Addis Ababa, Bole Sub-city",
      members: [
        { id: 1, name: "Abebe Kebede", age: 45, relation: "Father" },
        { id: 2, name: "Tigist Abebe", age: 40, relation: "Mother" },
        { id: 3, name: "Kidus Abebe", age: 12, relation: "Son" },
        { id: 4, name: "Hanna Abebe", age: 8, relation: "Daughter" }
      ],
      urgencyLevel: "high",
      needsDescription: "Family lost their home due to fire. Need immediate housing and food support.",
      registrationDate: "2023-08-15",
      status: "receiving-aid",
      documents: ["id-card.jpg", "house-damage-report.pdf"],
      monthlyIncome: 1200
    },
    {
      id: 2,
      mainContactName: "Fatima Mohammed",
      phoneNumber: "0922334455",
      address: "Addis Ababa, Kirkos Sub-city",
      members: [
        { id: 1, name: "Fatima Mohammed", age: 32, relation: "Mother" },
        { id: 2, name: "Amir Mohammed", age: 7, relation: "Son" },
        { id: 3, name: "Amina Mohammed", age: 5, relation: "Daughter" }
      ],
      urgencyLevel: "medium",
      needsDescription: "Single mother needs support for children's education and medical expenses.",
      registrationDate: "2023-09-23",
      status: "approved",
      documents: ["medical-records.pdf"],
      monthlyIncome: 900
    },
    {
      id: 3,
      mainContactName: "Mulugeta Tadesse",
      phoneNumber: "0933445566",
      address: "Addis Ababa, Yeka Sub-city",
      members: [
        { id: 1, name: "Mulugeta Tadesse", age: 67, relation: "Grandfather" },
        { id: 2, name: "Martha Mulugeta", age: 15, relation: "Granddaughter" },
        { id: 3, name: "Dawit Mulugeta", age: 13, relation: "Grandson" }
      ],
      urgencyLevel: "critical",
      needsDescription: "Elderly man raising grandchildren after losing son and daughter-in-law in car accident. Needs food, housing and medical support.",
      registrationDate: "2023-07-05",
      status: "receiving-aid",
      documents: ["death-certificate.pdf", "custody-documents.pdf"],
      monthlyIncome: 500
    }
  ]);

  const handleAddFamily = (family: Omit<Family, "id">) => {
    const newFamily = {
      ...family,
      id: families.length + 1
    };
    
    setFamilies([...families, newFamily]);
    toast.success("Family added successfully!");
  };

  const handleUpdateStatus = (id: number, status: Family["status"]) => {
    setFamilies(
      families.map(family => 
        family.id === id ? { ...family, status } : family
      )
    );
    toast.success("Family status updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Needy Families</h1>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="list">Family List</TabsTrigger>
          <TabsTrigger value="add">Add New Family</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <FamiliesList 
            families={families}
            onUpdateStatus={handleUpdateStatus}
          />
        </TabsContent>
        <TabsContent value="add" className="mt-6">
          <AddFamilyForm onSubmit={handleAddFamily} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FamiliesContent;
