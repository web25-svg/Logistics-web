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
import { Card } from "@/components/ui/card";

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
  is_loaded: "0", // moved inside shipment item
  status: "1",
};

export default function CreateShipment({ control, fields, append, remove }) {
  const [clients, setClients] = useState([]);
  const [airports, setAirports] = useState([]);
  const [items, setItems] = useState([]);
  const [perQuantityOptions, setPerQuantityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data (clients, airports, items, perQuantityOptions)
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

      // For demo, static per quantity options but dynamic state
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="col-span-3">
          {children || (
            <Controller
              name={name}
              control={control}
              rules={required ? { required: `${label} is required` } : {}}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id={name}
                    type={type}
                    {...field}
                    className={fieldState.error ? "border-red-500" : ""}
                    {...(type === "file" ? { value: undefined } : {})}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          )}
        </div>
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
                  className={fieldState.error ? "border-red-500" : ""}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Shipment Details Section */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-medium">Shipment Details</h3>

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

        {renderFormField({
          name: "description",
          label: "Description",
          children: (
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Enter description" />
              )}
            />
          ),
        })}

        {renderSelectField({
          name: "status",
          label: "Status",
          options: STATUS_OPTIONS,
          placeholder: "Select Status",
          required: true,
        })}

        {renderFormField({
          name: "air_way_bill_image",
          label: "Air Way Bill Image",
          type: "file",
          children: (
            <Controller
              name="air_way_bill_image"
              control={control}
              render={({ field }) => (
                <input
                  id="air_way_bill_image"
                  type="file"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              )}
            />
          ),
        })}
      </Card>

      {/* Shipment Items Section */}
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Shipment Items</h3>
          <Button
            type="button"
            onClick={() => append(DEFAULT_SHIPMENT_ITEM)}
            variant="outline"
          >
            Add Shipment Item
          </Button>
        </div>

        <div className="space-y-4">
          {fields?.map((item, index) => (
            <Card key={item.id || index} className="p-4 space-y-3 relative">
              <button
                type="button"
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                onClick={() => remove(index)}
                aria-label="Remove item"
              >
                ×
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cartons Quantity</Label>
                  <Controller
                    name={`shipment_items[${index}].cartons_quantity`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Cartons Quantity"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div>
                  <Label>Weight</Label>
                  <Controller
                    name={`shipment_items[${index}].weight`}
                    control={control}
                    render={({ field }) => (
                      <Input type="number" placeholder="Weight" {...field} />
                    )}
                  />
                </div>
                <div>
                  <Label>CBM</Label>
                  <Controller
                    name={`shipment_items[${index}].cbm`}
                    control={control}
                    render={({ field }) => (
                      <Input type="number" placeholder="CBM" {...field} />
                    )}
                  />
                </div>
                <div>
                  <Label>Per Quantity</Label>
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
                </div>
                {/* Cargo Type ID as Number input */}
                <div>
                  <Label>Cargo Type ID</Label>
                  <Controller
                    name={`shipment_items[${index}].cargo_type_id`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Enter Cargo Type ID"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <Label>Item</Label>
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
                          <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Specification</Label>
                <Controller
                  name={`shipment_items[${index}].specification`}
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Specification" {...field} />
                  )}
                />
              </div>

              <div>
                <Label>Packing Remarks</Label>
                <Controller
                  name={`shipment_items[${index}].packing_remarks`}
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Packing Remarks" {...field} />
                  )}
                />
              </div>

              <div>
                <Label>Brand Type</Label>
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
              </div>

              {/* is_loaded dropdown */}
              <div>
                <Label>Is Loaded</Label>
                <Controller
                  name={`shipment_items[${index}].is_loaded`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
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
              </div>

              {/* Status dropdown */}
              <div>
                <Label>Status</Label>
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
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
