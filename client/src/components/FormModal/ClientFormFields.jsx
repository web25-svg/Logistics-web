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
import { Switch } from "@/components/ui/switch";

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

      {/* Alias */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="alias" className="text-right">
          Alias
        </Label>
        <Controller
          name="alias"
          control={control}
          rules={{ required: "Alias is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="alias" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Phone */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="phone" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Whatsapp_Phone */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="whatsapp_phone" className="text-right">
          Whatsapp_Phone
        </Label>
        <Controller
          name="whatsapp_phone"
          control={control}
          rules={{ required: "Whatsapp_phone is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="whatsapp_phone" {...field} />
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

      {/* Is Active Toggle */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_active" className="text-right">
          Is Active
        </Label>
        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span className="text-sm">
                {field.value ? "Active" : "Inactive"}
              </span>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
