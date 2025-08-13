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
import getAirportName from "../../helper_functions/airPort.js";
import React, { useRef, useLayoutEffect } from "react";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  // Refs for top scrollbar container & its inner div
  const topScrollRef = useRef(null);
  const topInnerRef = useRef(null);

  // Refs for bottom (actual table) scroll container & its inner div
  const bottomScrollRef = useRef(null);
  const bottomInnerRef = useRef(null);

  useLayoutEffect(() => {
    const top = topScrollRef.current;
    const topInner = topInnerRef.current;
    const bottom = bottomScrollRef.current;
    const bottomInner = bottomInnerRef.current;
    if (!top || !topInner || !bottom || !bottomInner) return;

    // Function to match top scrollbar width with actual table content width
    const setTopWidth = () => {
      topInner.style.width = `${bottomInner.scrollWidth}px`;
    };

    // Keep both scrollbars in sync
    const onTopScroll = () => {
      bottom.scrollLeft = top.scrollLeft;
    };
    const onBottomScroll = () => {
      top.scrollLeft = bottom.scrollLeft;
    };

    top.addEventListener("scroll", onTopScroll);
    bottom.addEventListener("scroll", onBottomScroll);

    // Observe changes in table width (responsive / dynamic data changes)
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        requestAnimationFrame(setTopWidth);
      });
      ro.observe(bottomInner);
    } else {
      // Fallback if ResizeObserver not supported
      window.addEventListener("resize", setTopWidth);
    }

    // Initial width sync
    setTopWidth();

    return () => {
      top.removeEventListener("scroll", onTopScroll);
      bottom.removeEventListener("scroll", onBottomScroll);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", setTopWidth);
    };
  }, [data]); // Runs again when data changes

  return (
    <div className="rounded-md border">
      {/* === TOP SCROLLBAR (Sticky) === */}
      <div
        ref={topScrollRef}
        className="overflow-x-auto overflow-y-hidden"
        style={{ height: 12 }} // Minimal height so only scrollbar is visible
      >
        {/* Width will be dynamically set to match the table width */}
        <div ref={topInnerRef} style={{ height: 1 }} />
      </div>

      {/* === ACTUAL TABLE WITH BOTTOM SCROLLBAR === */}
      <div ref={bottomScrollRef} className="overflow-x-auto">
        <div ref={bottomInnerRef} className="min-w-max">
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
                data?.map((item) => (
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
                    <TableCell>{item?.total_receivable_amount || "N/A"}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md p-4">
                          <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.air_way_bill_image}`}
                            alt="Preview"
                            className="w-full h-auto rounded-lg object-contain"
                          />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{item?.description || "N/A"}</TableCell>
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
                ))
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
      </div>
    </div>
  );
}
