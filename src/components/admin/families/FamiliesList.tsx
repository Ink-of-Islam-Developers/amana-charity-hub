
import { useState } from "react";
import { Family } from "./FamiliesContent";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface FamiliesListProps {
  families: Family[];
  onUpdateStatus: (id: number, status: Family["status"]) => void;
}

const FamiliesList = ({ families, onUpdateStatus }: FamiliesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");

  const filteredFamilies = families.filter(family => {
    const matchesSearch = family.mainContactName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         family.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === "all" || family.urgencyLevel === urgencyFilter;
    
    return matchesSearch && matchesUrgency;
  });

  const getUrgencyBadge = (urgency: Family["urgencyLevel"]) => {
    const classes = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={classes[urgency]}>
        {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
      </Badge>
    );
  };
  
  const getStatusBadge = (status: Family["status"]) => {
    const classes = {
      pending: "bg-gray-100 text-gray-800",
      approved: "bg-green-100 text-green-800",
      "receiving-aid": "bg-purple-100 text-purple-800",
      completed: "bg-blue-100 text-blue-800"
    };
    
    const labels = {
      pending: "Pending",
      approved: "Approved",
      "receiving-aid": "Receiving Aid",
      completed: "Completed"
    };
    
    return (
      <Badge className={classes[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency Levels</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>List of registered needy families</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Main Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFamilies.length > 0 ? (
              filteredFamilies.map((family) => (
                <TableRow key={family.id}>
                  <TableCell>{family.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{family.mainContactName}</div>
                      <div className="text-sm text-muted-foreground">{family.phoneNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{family.address}</TableCell>
                  <TableCell>{family.members.length} members</TableCell>
                  <TableCell>{getUrgencyBadge(family.urgencyLevel)}</TableCell>
                  <TableCell>{getStatusBadge(family.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-1" /> Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Family Details</DialogTitle>
                            <DialogDescription>
                              Complete information about the family.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            <div>
                              <h3 className="font-semibold mb-2">Basic Information</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Main Contact:</span>
                                  <span>{family.mainContactName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Phone:</span>
                                  <span>{family.phoneNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Address:</span>
                                  <span>{family.address}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Monthly Income:</span>
                                  <span>{family.monthlyIncome} ETB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Registration Date:</span>
                                  <span>{new Date(family.registrationDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              <h3 className="font-semibold mt-4 mb-2">Needs Description</h3>
                              <div className="border rounded p-2 text-sm">
                                {family.needsDescription}
                              </div>
                              
                              <h3 className="font-semibold mt-4 mb-2">Documents</h3>
                              <div className="flex flex-wrap gap-2">
                                {family.documents.map((doc, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center border rounded px-2 py-1 text-xs"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    {doc}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-semibold mb-2">Family Members</h3>
                              <div className="border rounded divide-y">
                                {family.members.map((member) => (
                                  <div key={member.id} className="p-2 text-sm">
                                    <div className="font-medium">{member.name}</div>
                                    <div className="text-xs text-muted-foreground flex justify-between">
                                      <span>{member.relation}</span>
                                      <span>{member.age} years old</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4">
                                <h3 className="font-semibold mb-2">Update Status</h3>
                                <div className="flex gap-2 mt-2">
                                  <Select
                                    onValueChange={(value) => 
                                      onUpdateStatus(family.id, value as Family["status"])
                                    }
                                    defaultValue={family.status}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="approved">Approved</SelectItem>
                                      <SelectItem value="receiving-aid">Receiving Aid</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  
                                  <Button
                                    size="sm"
                                    onClick={() => onUpdateStatus(family.id, family.status)}
                                  >
                                    Update
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {family.urgencyLevel === "critical" && (
                        <Button variant="destructive" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Urgent
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FamiliesList;
