import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { getAllShipmentItems } from "../../utils/shipment-item-api.js";

export default function FormFields({ control }) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllShipmentItems();
      setItems(data?.shipmentItems);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to extract unique values
  const getUniqueOptions = (key, labelKey) => {
    const seen = new Set();
    return items
      .map((item) => ({
        value: item[key],
        label: labelKey ? item[labelKey] : item[key],
      }))
      .filter((opt) => {
        if (seen.has(opt.value)) return false;
        seen.add(opt.value);
        return true;
      });
  };

  // Dropdown data
  const shipmentOptions = getUniqueOptions("shipment_id", "shipment.recipt_no");
  const itemOptions = getUniqueOptions("item_id", "item.name");
  const containerOptions = getUniqueOptions(
    "container_id",
    "container.container_tracking_id"
  );
  const cargoTypeOptions = getUniqueOptions("cargo_type_id");
  const clientStatusOptions = getUniqueOptions("shipment_client_status_id");

  return (
    <div className="grid gap-4 py-4">
      {/* Cartons Quantity */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cartons_quantity" className="text-right">
          Cartons Quantity
        </Label>
        <Controller
          name="cartons_quantity"
          control={control}
          rules={{ required: "Cartons Quantity is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="cartons_quantity" type="number" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      {/* Weight */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="weight" className="text-right">
          Weight (KGs)
        </Label>
        <Controller
          name="weight"
          control={control}
          rules={{ required: "Weight is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="weight" type="number" step="0.01" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      {/* CBM */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cbm" className="text-right">
          CBM
        </Label>
        <Controller
          name="cbm"
          control={control}
          rules={{ required: "CBM is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="cbm" type="number" step="0.01" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      {/* Per Quantity */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="per_quantity" className="text-right">
          Per Quantity
        </Label>
        <Controller
          name="per_quantity"
          control={control}
          rules={{ required: "Per Quantity is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="per_quantity" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
      {/* Specification */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="specification" className="text-right">
          Specification
        </Label>
        <Controller
          name="specification"
          control={control}
          rules={{ required: "Specification is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="specification" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Packing Remarks */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="packing_remarks" className="text-right">
          Packing Remarks
        </Label>
        <Controller
          name="packing_remarks"
          control={control}
          rules={{ required: "Packing Remarks is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="packing_remarks" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Brand Type */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="brand_type" className="text-right">
          Brand Type
        </Label>
        <Controller
          name="brand_type"
          control={control}
          rules={{ required: "Brand Type is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Branded">Branded</SelectItem>
                  <SelectItem value="Non-Branded">Non-Branded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Is Loaded */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_loaded" className="text-right">
          Is Loaded?
        </Label>
        <Controller
          name="is_loaded"
          control={control}
          rules={{ required: "Is Loaded status is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Yes</SelectItem>
                  <SelectItem value="0">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
      {/* Status */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Status
        </Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Dropdowns: Shipment ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="shipment_id" className="text-right">
          Shipment
        </Label>
        <Controller
          name="shipment_id"
          control={control}
          rules={{ required: "Shipment is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Shipment" />
                </SelectTrigger>
                <SelectContent>
                  {shipmentOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value?.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Item ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="item_id" className="text-right">
          Item
        </Label>
        <Controller
          name="item_id"
          control={control}
          rules={{ required: "Item is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
                <SelectContent>
                  {itemOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value?.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Container ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="container_id" className="text-right">
          Container
        </Label>
        <Controller
          name="container_id"
          control={control}
          rules={{ required: "Container is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Container" />
                </SelectTrigger>
                <SelectContent>
                  {containerOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value?.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Cargo Type ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cargo_type_id" className="text-right">
          Cargo Type
        </Label>
        <Controller
          name="cargo_type_id"
          control={control}
          rules={{ required: "Cargo Type is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Cargo Type" />
                </SelectTrigger>
                <SelectContent>
                  {cargoTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value?.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Shipment Client Status */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="shipment_client_status_id" className="text-right">
          Client Status
        </Label>
        <Controller
          name="shipment_client_status_id"
          control={control}
          rules={{ required: "Client Status is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {clientStatusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value?.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
