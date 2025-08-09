import { columns, Medicine } from "@/components/organisms/Columns";
import { DataTable } from "@/components/organisms/DataTable"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/lib/axiosInstance";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Types for pagination (matching your backend response)
interface PaginatedResponse {
  data: Medicine[];
  totalCount: number;
  results: number;
}

export const DashboardTemplate = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<Medicine[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [itemsPerPage] = React.useState(10); // You can make this dynamic too

  async function getData(page: number = 1, limit: number = 4): Promise<PaginatedResponse> {
    try {
      setLoading(true);

      // Update your API call to include pagination parameters
      const response = await axiosInstance.get<PaginatedResponse>("/admin/medicine/all", {
        params: {
          page,
          limit,
        }
      });

      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
      return {
        data: [],
        totalCount: 0,
        results: 0
      };
    } finally {
      setLoading(false);
      console.log("Data fetch completed");
    }
  }

  const fetchData = async (page: number = currentPage) => {
    const result = await getData(page, itemsPerPage);
    console.log("Fetched data:", result);

    setData(result.data);
    setCurrentPage(page);
    setTotalItems(result.totalCount);
    setTotalPages(Math.ceil(result.totalCount / itemsPerPage));

    console.log("Updated state:", {
      currentPage: page,
      totalItems: result.totalCount,
      totalPages: Math.ceil(result.totalCount / itemsPerPage),
      dataLength: result.data.length
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setFileError("");
  };

  useEffect(() => {
    fetchData();
  }, []); // Only run on component mount

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError("");

    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setFileError("Please select a valid CSV file");
        setSelectedFile(null);
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setFileError("File size must be less than 5MB");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      console.log("Selected file:", file.name, file.size, file.type);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setFileError("Please select a CSV file");
      return;
    }

    setIsUploading(true);
    setFileError("");

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('uploadType', 'medicines');

      console.log("Uploading file:", selectedFile.name);

      const response = await axiosInstance.post('/admin/medicine/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("🚀 ~ handleUpload ~ response:", response);

      toast.success(response.data.message || "File uploaded successfully");

      // Refresh data after successful upload - go back to first page
      await fetchData(1);

      handleClose();

    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Upload failed:", err);

      toast.error(err?.message || "Upload failed. Please try again.");
      setFileError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadSample = () => {
    const link = document.createElement('a');
    link.href = '/sample.csv';
    link.download = 'sample.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      fetchData(page);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="px-5 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medicines Dashboard</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer bg-green-500 hover:bg-green-300">
              Add Medicine via CSV
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUpload}>
              <DialogHeader>
                <DialogTitle>Upload CSV</DialogTitle>
                <DialogDescription>
                  The CSV headers should match the medicine fields.
                  You can download a sample CSV template{" "}
                  <span
                    onClick={handleDownloadSample}
                    className="font-bold hover:text-slate-600 cursor-pointer underline"
                  >
                    here
                  </span>.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="csvFile">Select CSV File *</Label>
                  <Input
                    id="csvFile"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                    required
                  />

                  {selectedFile && (
                    <p className="text-sm text-green-600">
                      ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}

                  {fileError && (
                    <p className="text-sm text-red-600">
                      ⚠ {fileError}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="bg-red-400 cursor-pointer hover:bg-red-300"
                    type="button"
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  className="bg-green-400 cursor-pointer hover:bg-green-300"
                  variant="outline"
                  type="submit"
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable loading={loading} columns={columns} data={data} />

      {/* Pagination Info */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Showing {data.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </p>

        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Dynamic Pagination - Always show if there's data */}
      {totalItems > 0 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goToPrevious}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-100"}
              />
            </PaginationItem>

            {generatePageNumbers().map((pageNumber, index) => (
              <PaginationItem key={index}>
                {pageNumber === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => goToPage(pageNumber as number)}
                    isActive={pageNumber === currentPage}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={goToNext}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-gray-100"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

    </div>
  );
};