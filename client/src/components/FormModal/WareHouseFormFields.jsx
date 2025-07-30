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

      {/* Adress */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
         Adress
        </Label>
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
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
