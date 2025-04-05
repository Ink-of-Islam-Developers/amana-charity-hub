
import { useState } from "react";
import { Search, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type Donation = {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  isRecurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'annually';
};

type DonationsListProps = {
  limit?: number;
  showViewAll?: boolean;
  recurring?: boolean;
};

const sampleDonations: Donation[] = [
  {
    id: 'DON-1001',
    donorName: 'John Smith',
    email: 'john@example.com',
    amount: 250,
    date: '2025-04-01',
    paymentMethod: 'Credit Card',
    status: 'completed',
    isRecurring: true,
    frequency: 'monthly'
  },
  {
    id: 'DON-1002',
    donorName: 'Sarah Johnson',
    email: 'sarah@example.com',
    amount: 100,
    date: '2025-04-02',
    paymentMethod: 'PayPal',
    status: 'completed',
    isRecurring: false
  },
  {
    id: 'DON-1003',
    donorName: 'Michael Brown',
    email: 'michael@example.com',
    amount: 500,
    date: '2025-04-03',
    paymentMethod: 'Credit Card',
    status: 'completed',
    isRecurring: false
  },
  {
    id: 'DON-1004',
    donorName: 'Emily Wilson',
    email: 'emily@example.com',
    amount: 75,
    date: '2025-04-03',
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    isRecurring: false
  },
  {
    id: 'DON-1005',
    donorName: 'David Lee',
    email: 'david@example.com',
    amount: 150,
    date: '2025-04-04',
    paymentMethod: 'Credit Card',
    status: 'completed',
    isRecurring: true,
    frequency: 'monthly'
  },
  {
    id: 'DON-1006',
    donorName: 'Jennifer Garcia',
    email: 'jennifer@example.com',
    amount: 300,
    date: '2025-04-05',
    paymentMethod: 'PayPal',
    status: 'completed',
    isRecurring: false
  },
  {
    id: 'DON-1007',
    donorName: 'Robert Martinez',
    email: 'robert@example.com',
    amount: 50,
    date: '2025-04-05',
    paymentMethod: 'Credit Card',
    status: 'failed',
    isRecurring: false
  }
];

const DonationsList = ({ limit, showViewAll = false, recurring = false }: DonationsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter donations based on props and search term
  let filteredDonations = [...sampleDonations];

  if (recurring) {
    filteredDonations = filteredDonations.filter(d => d.isRecurring);
  }

  if (searchTerm) {
    filteredDonations = filteredDonations.filter(
      donation =>
        donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply limit if specified
  const displayDonations = limit 
    ? filteredDonations.slice(0, limit) 
    : filteredDonations;

  const showDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      {!limit && (
        <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search donations..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="flex items-center gap-2">
            <Download size={16} />
            Export CSV
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Donor</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            {!limit && <TableHead>Payment Method</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayDonations.length > 0 ? (
            displayDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{donation.donorName}</div>
                    <div className="text-xs text-muted-foreground">{donation.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${donation.amount.toFixed(2)}
                  {donation.isRecurring && (
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                      {donation.frequency}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      donation.status === 'completed' ? 'default' : 
                      donation.status === 'pending' ? 'outline' : 
                      'destructive'
                    }
                    className={
                      donation.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                      donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                      'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </Badge>
                </TableCell>
                {!limit && <TableCell>{donation.paymentMethod}</TableCell>}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => showDetails(donation)}
                    className="hover:bg-gray-100"
                  >
                    <FileText size={16} />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={limit ? 6 : 7} className="text-center py-8 text-muted-foreground">
                No donations found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showViewAll && filteredDonations.length > limit! && (
        <div className="flex justify-center mt-4">
          <Link to="/admin/donations">
            <Button variant="outline">View All Donations</Button>
          </Link>
        </div>
      )}

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>
              Complete information about this donation.
            </DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Donation ID</p>
                  <p className="text-sm">{selectedDonation.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge 
                    variant={
                      selectedDonation.status === 'completed' ? 'default' : 
                      selectedDonation.status === 'pending' ? 'outline' : 
                      'destructive'
                    }
                    className={
                      selectedDonation.status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                      selectedDonation.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                      'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="text-sm">{new Date(selectedDonation.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="text-sm font-bold">${selectedDonation.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Donor Name</p>
                  <p className="text-sm">{selectedDonation.donorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm">{selectedDonation.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="text-sm">{selectedDonation.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Recurring</p>
                  <p className="text-sm">
                    {selectedDonation.isRecurring 
                      ? `Yes (${selectedDonation.frequency})` 
                      : 'No'}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Actions</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">Send Receipt</Button>
                  <Button size="sm" variant="outline">Download PDF</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationsList;
