
import { useState } from "react";
import { Family, FamilyMember } from "./FamiliesContent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Upload, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AddFamilyFormProps {
  onSubmit: (family: Omit<Family, "id">) => void;
}

const formSchema = z.object({
  mainContactName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  urgencyLevel: z.enum(["low", "medium", "high", "critical"]),
  needsDescription: z.string().min(10, {
    message: "Please provide a detailed description of at least 10 characters.",
  }),
  monthlyIncome: z.coerce.number().min(0, {
    message: "Monthly income must be a positive number.",
  }),
});

const AddFamilyForm = ({ onSubmit }: AddFamilyFormProps) => {
  const [familyMembers, setFamilyMembers] = useState<
    Array<Omit<FamilyMember, "id">>
  >([]);
  const [memberName, setMemberName] = useState("");
  const [memberAge, setMemberAge] = useState("");
  const [memberRelation, setMemberRelation] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainContactName: "",
      phoneNumber: "",
      address: "",
      urgencyLevel: "medium",
      needsDescription: "",
      monthlyIncome: 0,
    },
  });
  
  const addFamilyMember = () => {
    if (memberName && memberAge && memberRelation) {
      setFamilyMembers([
        ...familyMembers,
        {
          name: memberName,
          age: parseInt(memberAge),
          relation: memberRelation,
        },
      ]);
      // Clear inputs
      setMemberName("");
      setMemberAge("");
      setMemberRelation("");
    }
  };
  
  const removeFamilyMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setDocuments([...documents, ...fileNames]);
    }
  };
  
  const removeDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };
  
  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    if (familyMembers.length === 0) {
      alert("Please add at least one family member");
      return;
    }
    
    const today = new Date().toISOString().split("T")[0];
    
    const newFamily: Omit<Family, "id"> = {
      mainContactName: values.mainContactName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      urgencyLevel: values.urgencyLevel,
      needsDescription: values.needsDescription,
      monthlyIncome: values.monthlyIncome,
      members: familyMembers.map((member, index) => ({ ...member, id: index + 1 })),
      registrationDate: today,
      status: "pending",
      documents: documents,
    };
    
    onSubmit(newFamily);
    
    // Reset form
    form.reset();
    setFamilyMembers([]);
    setDocuments([]);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="mainContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 0911223344" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Sub-city, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (ETB)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Urgency Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select based on the family's current situation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="needsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description of Needs</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the family's situation and needs" 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <h3 className="font-medium mb-3">Family Members</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      placeholder="Member name"
                    />
                  </div>
                  <div>
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="number"
                      value={memberAge}
                      onChange={(e) => setMemberAge(e.target.value)}
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <FormLabel>Relation</FormLabel>
                    <Input
                      value={memberRelation}
                      onChange={(e) => setMemberRelation(e.target.value)}
                      placeholder="e.g. Father, Mother, Son"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFamilyMember}
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" /> Add Family Member
                </Button>
              </CardContent>
            </Card>

            {familyMembers.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Added Members:</h4>
                <div className="border rounded-md">
                  {familyMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                      <div>
                        <span className="font-medium">{member.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({member.age} years, {member.relation})
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFamilyMember(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3">Supporting Documents</h3>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">ID cards, certificates, or other supporting documents</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {documents.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Uploaded Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded px-3 py-1 bg-gray-50"
                    >
                      <span className="text-sm">{doc}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 ml-1"
                        onClick={() => removeDocument(index)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />
          
          <div className="flex justify-end">
            <Button type="submit">Register Family</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddFamilyForm;
