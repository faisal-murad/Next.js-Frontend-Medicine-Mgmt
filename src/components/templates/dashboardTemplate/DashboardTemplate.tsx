import { columns, Medicine } from "@/components/organisms/Columns";
import { DataTable } from "@/components/organisms/DataTable"
import axiosInstance from "@/lib/axiosInstance"  
import React, { useEffect } from "react";

async function getData(): Promise<Medicine[]> { 

  // const response = await axiosInstance.get<Medicine[]>("/medicines");
  // const data: Medicine[] = response.data;
  
  const data: Medicine[] = [
    {
      _id: "1",
      productName: "Paracetamol 500mg",
      batchNumber: "BATCH001",
      received: 1000,
      issued: 200,
      balance: 800,
      expiryDate: "2025-12-31",
    },
    {
      _id: "2",
      productName: "Ibuprofen 200mg",
      batchNumber: "BATCH002",
      received: 800,
      issued: 150,
      balance: 650,
      expiryDate: "2024-11-30",
    },
    {
      _id: "3",
      productName: "Amoxicillin 250mg",
      batchNumber: "BATCH003",
      received: 500,
      issued: 100,
      balance: 400,
      expiryDate: "2026-01-15",
    },
    {
      _id: "4",
      productName: "Cetirizine 10mg",
      batchNumber: "BATCH004",
      received: 600,
      issued: 120,
      balance: 480,
      expiryDate: "2025-07-20",
    },
    {
      _id: "5",
      productName: "Metformin 500mg",
      batchNumber: "BATCH005",
      received: 900,
      issued: 300,
      balance: 600,
      expiryDate: "2026-03-10",
    },
    {
      _id: "6",
      productName: "Aspirin 81mg",
      batchNumber: "BATCH006",
      received: 1200,
      issued: 400,
      balance: 800,
      expiryDate: "2025-09-05",
    },
    {
      _id: "7",
      productName: "Lisinopril 10mg",
      batchNumber: "BATCH007",
      received: 700,
      issued: 200,
      balance: 500,
      expiryDate: "2026-06-18",
    },
    {
      _id: "8",
      productName: "Simvastatin 20mg",
      batchNumber: "BATCH008",
      received: 650,
      issued: 150,
      balance: 500,
      expiryDate: "2025-10-22",
    },
    {
      _id: "9",
      productName: "Omeprazole 20mg",
      batchNumber: "BATCH009",
      received: 750,
      issued: 250,
      balance: 500,
      expiryDate: "2026-02-28",
    },
    {
      _id: "10",
      productName: "Azithromycin 500mg",
      batchNumber: "BATCH010",
      received: 400,
      issued: 100,
      balance: 300,
      expiryDate: "2025-08-14",
    },
  ]; 
  return data;

}

export const DashboardTemplate = () => {

  const [data, setData] = React.useState<Medicine[]>([]);

  useEffect(()=>{
    async function fetchData() {
      const data = await getData();
      console.log(data);
      setData(data);
    }
    
    fetchData();

  },[])


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}