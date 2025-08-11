// src/components/DataTable/DataTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog.jsx";
import { Skeleton } from "../ui/skeleton";
import TableActions from "./TableActions";
import { formatDateTime } from "../../helper_functions/convertDateTime.js";
import { Button } from "../ui/button.jsx";
import { Card, CardContent } from "../ui/card.jsx";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cartons Quantity</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>CBM</TableHead>
            <TableHead>Per Quantity</TableHead>
            <TableHead>Specification</TableHead>
            <TableHead>Packing Remarks</TableHead>
            <TableHead>Brand Type</TableHead>
            <TableHead>Is Loaded</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array(11)
                    .fill(0)
                    .map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : data?.length > 0 ? (
            data?.map((item) => {
              // console.log("item: ", item);
              // console.log("import.meta.env.VITE_API_URL: ", import.meta.env.VITE_API_URL);

              return (
                <TableRow key={item.id}>
                  <TableCell>{item?.id || "N/A"}</TableCell>
                  <TableCell>{item?.cartons_quantity || "N/A"}</TableCell>
                  <TableCell>{item?.weight || "N/A"}</TableCell>
                  <TableCell>{item?.cbm || "N/A"}</TableCell>
                  <TableCell>{item?.per_quantity || "N/A"}</TableCell>
                  <TableCell>{item?.specification || "N/A"}</TableCell>
                  <TableCell>{item?.packing_remarks || "N/A"}</TableCell>
                  <TableCell>{item?.brand_type || "N/A"}</TableCell>
                  <TableCell>{item?.is_loaded || "N/A"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <TableActions
                      onEdit={() => onEdit(item)}
                      onDelete={() => onDelete(item.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-4">
                No items found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
