"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import moment from 'moment-timezone';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Medicine = {
  _id: string
  productName: string
  batchNumber: string
  received: number
  issued: number
  balance: number
  expiryDate: string
}

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
  },
  {
    accessorKey: "received",
    header: "Received",
  },
  {
    accessorKey: "issued",
    header: "Issued",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ getValue }) => {
      const dateStr = getValue() as string;
      if (!dateStr) return '-';
      // Parse and format date in Karachi timezone
      const formattedDate = moment.tz(dateStr, "Asia/Karachi").format("MMMM D, YYYY");
      return formattedDate;
    }
  },
  {
    id: "actions",
    // cell: ({ row }) => {
    cell: () => {
      // const medicine = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-500 text-white p-2 font-semibold rounded-md">
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]