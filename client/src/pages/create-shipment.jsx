import React, { useEffect, useState, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { getAllShipments } from "../utils/shipment-api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

// Color Theme
const COLORS = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

// Font Family (using Tailwind's default font stack)
const FONT_FAMILY = "font-sans";

const BRAND_TYPES = ["Branded", "Non-Branded"];
const STATUS_OPTIONS = [
  { id: "1", name: "Active" },
  { id: "0", name: "Inactive" },
];

const DEFAULT_SHIPMENT_ITEM = {
  item_id: "",
  cartons_quantity: 0,
  weight: 0,
  cbm: 0,
  per_quantity: "",
  specification: "",
  packing_remarks: "",
  brand_type: "",
  cargo_type_id: "",
  is_loaded: "0",
  status: "1",
};

export default function CreateShipment({ control, fields, append, remove }) {
  const [clients, setClients] = useState([]);
  const [airports, setAirports] = useState([]);
  const [items, setItems] = useState([]);
  const [perQuantityOptions, setPerQuantityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const shipmentData = await getAllShipments();

      const extractedClients =
        shipmentData?.shipments?.map((s) => ({
          id: s.client?.id,
          name: s.client?.name,
        })) || [];

      const extractedAirports =
        shipmentData?.shipments
          ?.filter((s) => s.receiving_airport)
          ?.map((s) => ({
            id: s.receiving_airport.id,
            name: s.receiving_airport.name,
          })) || [];

      const extractedItems = shipmentData?.shipments
        ?.flatMap((shipment) => shipment.shipment_items || [])
        ?.map((si) => si.item)
        ?.filter(Boolean);

      const uniqueClients = [
        ...new Map(extractedClients?.map((c) => [c.id, c])).values(),
      ];
      const uniqueAirports = [
        ...new Map(extractedAirports?.map((a) => [a.id, a])).values(),
      ];
      const uniqueItems = [
        ...new Map(extractedItems?.map((i) => [i.id, i])).values(),
      ];

      setClients(uniqueClients);
      setAirports(uniqueAirports);
      setItems(uniqueItems);

      setPerQuantityOptions(["Piece", "Box", "Unit", "Carton"]);
    } catch (error) {
      console.error("Error loading data:", error?.message || error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderFormField = useCallback(
    ({ name, label, type = "text", required = false, children }) => (
      <div className="mb-4">
        <Label htmlFor={name} className="block mb-2 font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {children || (
          <Controller
            name={name}
            control={control}
            rules={required ? { required: `${label} is required` } : {}}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  id={name}
                  type={type}
                  {...field}
                  className={`w-full ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
                  {...(type === "file" ? { value: undefined } : {})}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        )}
      </div>
    ),
    [control]
  );

  const renderSelectField = useCallback(
    ({ name, options, placeholder, label, required = false }) =>
      renderFormField({
        name,
        label,
        required,
        children: (
          <Controller
            name={name}
            control={control}
            rules={required ? { required: `${label} is required` } : {}}
            render={({ field, fieldState }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger
                  className={`w-full ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {options.map((option) => (
                    <SelectItem
                      key={option.id ?? option}
                      value={String(option.id ?? option)}
                    >
                      {option.name ?? option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        ),
      }),
    [control, renderFormField]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${FONT_FAMILY} space-y-6 p-4 max-w-6xl mx-auto`}>
      {/* Shipment Details Section */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Shipment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderFormField({
            name: "shipment_tracking_id",
            label: "Tracking ID",
            type: "number",
            required: true,
          })}

          {renderFormField({
            name: "recipt_no",
            label: "Receipt No",
          })}

          {renderFormField({
            name: "recieved_from",
            label: "Received From",
          })}

          {renderFormField({
            name: "marka",
            label: "Marka",
          })}

          {renderSelectField({
            name: "client_id",
            label: "Client",
            options: clients,
            placeholder: "Select Client",
            required: true,
          })}

          {renderFormField({
            name: "fully_loading_date",
            label: "Fully Loading Date",
            type: "date",
          })}

          {renderFormField({
            name: "total_kgs",
            label: "Total Kgs",
            type: "number",
          })}

          {renderFormField({
            name: "total_cartons",
            label: "Total Cartons",
            type: "number",
          })}

          {renderFormField({
            name: "total_cbm",
            label: "Total CBM",
            type: "number",
          })}

          {renderSelectField({
            name: "receiving_airport_id",
            label: "Receiving Airport",
            options: airports,
            placeholder: "Select Airport",
          })}

          {renderFormField({
            name: "rate",
            label: "Rate",
            type: "number",
          })}

          {renderFormField({
            name: "total_receivable_amount",
            label: "Total Receivable Amount",
            type: "number",
          })}

          <div className="md:col-span-2">
            {renderFormField({
              name: "description",
              label: "Description",
              children: (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Enter description"
                      className="min-h-[100px]"
                    />
                  )}
                />
              ),
            })}
          </div>

          {renderSelectField({
            name: "status",
            label: "Status",
            options: STATUS_OPTIONS,
            placeholder: "Select Status",
            required: true,
          })}

          <div className="md:col-span-2">
            {renderFormField({
              name: "air_way_bill_image",
              label: "Air Way Bill Image",
              type: "file",
              children: (
                <Controller
                  name="air_way_bill_image"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <input
                        id="air_way_bill_image"
                        type="file"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                  )}
                />
              ),
            })}
          </div>
        </CardContent>
      </Card>

      {/* Shipment Items Section */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Shipment Items
            </CardTitle>
            <Button
              type="button"
              onClick={() => append(DEFAULT_SHIPMENT_ITEM)}
              className={`${COLORS.primary} font-medium`}
            >
              Add Shipment Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {fields?.map((item, index) => (
            <Card
              key={item.id || index}
              className="p-6 space-y-4 relative border border-gray-200"
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => remove(index)}
                aria-label="Remove item"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].item_id`,
                    label: "Item",
                    required: true,
                    children: (
                      <Controller
                        name={`shipment_items[${index}].item_id`}
                        control={control}
                        rules={{ required: "Item is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Item" />
                            </SelectTrigger>
                            <SelectContent>
                              {items.map((item) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ),
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].cartons_quantity`,
                    label: "Cartons Quantity",
                    type: "number",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].weight`,
                    label: "Weight",
                    type: "number",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].cbm`,
                    label: "CBM",
                    type: "number",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].per_quantity`,
                    label: "Per Quantity",
                    children: (
                      <Controller
                        name={`shipment_items[${index}].per_quantity`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Per Quantity" />
                            </SelectTrigger>
                            <SelectContent>
                              {perQuantityOptions.map((q) => (
                                <SelectItem key={q} value={q}>
                                  {q}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ),
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].cargo_type_id`,
                    label: "Cargo Type ID",
                    type: "number",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].specification`,
                    label: "Specification",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].packing_remarks`,
                    label: "Packing Remarks",
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].brand_type`,
                    label: "Brand Type",
                    children: (
                      <Controller
                        name={`shipment_items[${index}].brand_type`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Brand Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {BRAND_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ),
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].is_loaded`,
                    label: "Is Loaded?",
                    children: (
                      <Controller
                        name={`shipment_items[${index}].is_loaded`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={(val) => field.onChange(String(val))}
                            value={String(field.value ?? "0")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Loaded Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Yes</SelectItem>
                              <SelectItem value="0">No</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ),
                  })}
                </div>

                <div>
                  {renderFormField({
                    name: `shipment_items[${index}].status`,
                    label: "Status",
                    children: (
                      <Controller
                        name={`shipment_items[${index}].status`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ),
                  })}
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}