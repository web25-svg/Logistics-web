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
            <TableHead>Shipment Tracking Id</TableHead>
            <TableHead>Recipt No</TableHead>
            <TableHead>Recieved From</TableHead>
            <TableHead>Marka</TableHead>
            <TableHead>Fully Loading Date</TableHead>
            <TableHead>Total Kgs</TableHead>
            <TableHead>Total Cartons</TableHead>
            <TableHead>Total Cbm</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Total Receivable Amount</TableHead>
            <TableHead>Air Way Bill</TableHead>
            <TableHead>description</TableHead>
            {/* <TableHead>Port</TableHead> */}
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
                  <TableCell>{item?.shipment_tracking_id || "N/A"}</TableCell>
                  <TableCell>{item?.recipt_no || "N/A"}</TableCell>
                  <TableCell>{item?.recieved_from || "N/A"}</TableCell>
                  <TableCell>{item?.marka || "N/A"}</TableCell>
                  <TableCell>
                    {formatDateTime(item?.fully_loading_date) || "N/A"}
                  </TableCell>
                  <TableCell>{item?.total_kgs || "N/A"}</TableCell>
                  <TableCell>{item?.total_cartons || "N/A"}</TableCell>
                  <TableCell>{item?.total_cbm || "N/A"}</TableCell>
                  <TableCell>{item?.rate || "N/A"}</TableCell>
                  <TableCell>
                    {item?.total_receivable_amount || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-md p-4">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${
                            item.air_way_bill_image
                          }`}
                          alt="Preview"
                          className="w-full h-auto rounded-lg object-contain"
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>

                  <TableCell>{item?.description || "N/A"}</TableCell>
                  {/* <TableCell>{item?.receiving_airport_id || "N/A"}</TableCell> */}

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
