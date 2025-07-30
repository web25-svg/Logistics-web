// src/components/FormModal/FormFields.jsx
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
      {/* Name */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="name" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Mark */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mark" className="text-right">
          Mark
        </Label>
        <Controller
          name="mark"
          control={control}
          rules={{ required: "Mark is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="mark" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Item unique_key */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="item_unique_key" className="text-right">
          Item Unique key
        </Label>
        <Controller
          name="item_unique_key"
          control={control}
          rules={{ required: "Item unique key is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                id="item_unique_key"
                type="number"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Packing Description */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="packing_description" className="text-right">
          Packing Description
        </Label>
        <Controller
          name="packing_description"
          control={control}
          rules={{ required: "Packing description is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Textarea id="packing_description" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Cargo Type ID */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cargo_type_id" className="text-right">
          Cargo Type ID
        </Label>
        <Controller
          name="cargo_type_id"
          control={control}
          rules={{ required: "Cargo type ID is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                id="cargo_type_id"
                type="number"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
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
                  <SelectValue placeholder="Select brand type" />
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
              <Select onValueChange={field.onChange} value={field.value}>
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
    </div>
  );
}
