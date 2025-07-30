// src/components/DataTable/DataTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import TableActions from "./TableActions";
import { formatDateTime } from "../../helper_functions/convertDateTime.js";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Item_unique_key</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mark</TableHead>
            <TableHead>Packing_description</TableHead>
            <TableHead>Cargo_type_id</TableHead>
            <TableHead>brand_type</TableHead>
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
                  <TableCell>
                    <Skeleton className="h-4 w-[50px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                </TableRow>
              ))
          ) : data.length > 0 ? (
            <>
              {data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.item_unique_key}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.mark}</TableCell>
                    <TableCell>{item.packing_description}</TableCell>
                    <TableCell>{item.cargo_type_id}</TableCell>
                    <TableCell>{item.brand_type}</TableCell>
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
              })}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No items found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
