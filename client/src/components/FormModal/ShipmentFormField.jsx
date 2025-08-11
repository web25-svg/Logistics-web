import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label.jsx";
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
import { getAllShipments } from "../../utils/shipment-api.js";

export default function CreateShipment({ control, fields, append, remove }) {
  const [clients, setClients] = useState([]);
  const [airports, setAirports] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cargoTypes] = useState([
    { id: 3, name: "Electronics" },
    { id: 5, name: "Appliances" },
  ]);
  const perQuantityOptions = ["Piece", "Box", "Unit", "Piece123"];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const shipmentData = await getAllShipments();        
        const extractedClients = shipmentData?.shipments?.map(shipment => ({
          id: shipment.client.id,
          name: shipment.client.name,
        })) || [];
        const extractedAirports = shipmentData?.shipments
          ?.filter(shipment => shipment.receiving_airport)
          ?.map(shipment => ({
            id: shipment.receiving_airport.id,
            name: shipment.receiving_airport.name,
          })) || [];
        const extractedItems = shipmentData?.shipments?.flatMap(shipment =>
          shipment.shipment_items?.map(item => ({
            id: item.item.id,
            name: item.item.name,
            item_unique_key: item.item.item_unique_key,
          }))
        ) || [];

        setClients([...new Map(extractedClients?.map(client => [client.id, client])).values()]);
        setAirports([...new Map(extractedAirports?.map(airport => [airport.id, airport])).values()]);
        setItems([...new Map(extractedItems?.map(item => [item.id, item])).values()]);
      } catch (error) {
        console.error("Error loading data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);


  return (
    <form className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="shipment_tracking_id" className="text-right">Tracking ID</Label>
        <Controller
          name="shipment_tracking_id"
          control={control}
          rules={{ required: "Shipment Tracking ID is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="shipment_tracking_id" type="number" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="recipt_no" className="text-right">Receipt No</Label>
        <Controller
          name="recipt_no"
          control={control}
          rules={{ required: "Receipt No is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="recipt_no" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="recieved_from" className="text-right">Received From</Label>
        <Controller
          name="recieved_from"
          control={control}
          rules={{ required: "Received From is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="recieved_from" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="marka" className="text-right">Marka</Label>
        <Controller
          name="marka"
          control={control}
          rules={{ required: "Marka is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="marka" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="client_id" className="text-right">Client</Label>
        <Controller
          name="client_id"
          control={control}
          rules={{ required: "Client is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : (
                    clients?.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="fully_loading_date" className="text-right">Fully Loading Date</Label>
        <Controller
          name="fully_loading_date"
          control={control}
          rules={{ required: "Loading Date is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="fully_loading_date" type="date" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="air_way_bill_image" className="text-right">Upload File</Label>
        <Controller
          name="air_way_bill_image"
          control={control}
          rules={{ required: "File is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                type="file"
                id="air_way_bill_image"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={cn(fieldState.error && "border-red-500")}
              />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="total_kgs" className="text-right">Total KGs</Label>
        <Controller
          name="total_kgs"
          control={control}
          rules={{ required: "Total KGs is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="total_kgs" type="number" step="0.01" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="total_cartons" className="text-right">Total Cartons</Label>
        <Controller
          name="total_cartons"
          control={control}
          rules={{ required: "Total Cartons is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="total_cartons" type="number" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="total_cbm" className="text-right">Total CBM</Label>
        <Controller
          name="total_cbm"
          control={control}
          rules={{ required: "Total CBM is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="total_cbm" type="number" step="0.01" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="receiving_airport_id" className="text-right">Receiving Airport</Label>
        <Controller
          name="receiving_airport_id"
          control={control}
          rules={{ required: "Receiving Airport is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Airport" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : (
                    airports?.map((airport) => (
                      <SelectItem key={airport.id} value={airport.id}>
                        {airport.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="rate" className="text-right">Rate</Label>
        <Controller
          name="rate"
          control={control}
          rules={{ required: "Rate is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="rate" type="number" step="0.01" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="total_receivable_amount" className="text-right">Receivable Amount</Label>
        <Controller
          name="total_receivable_amount"
          control={control}
          rules={{ required: "Receivable Amount is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="total_receivable_amount" type="number" step="0.01" {...field} />
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="col-span-3">
              <Textarea id="description" {...field} />
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">Status</Label>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="border-t mt-6 pt-4">
        <h2 className="text-lg font-semibold mb-4">Shipment Items</h2>
        {fields?.map((item, index) => (
          <div key={item.id} className="border p-4 mb-4 rounded-md bg-gray-50">
            <h3 className="font-medium mb-2">Item #{index + 1}</h3>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.item_id`} className="text-right">Item</Label>
              <Controller
                name={`shipment_items.${index}.item_id`}
                control={control}
                rules={{ required: "Item is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Item" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading">Loading...</SelectItem>
                        ) : (
                          items?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name} ({item.item_unique_key})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.cargo_type_id`} className="text-right">Cargo Type</Label>
              <Controller
                name={`shipment_items.${index}.cargo_type_id`}
                control={control}
                rules={{ required: "Cargo Type is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Cargo Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cargoTypes?.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.cartons_quantity`} className="text-right">Cartons Quantity</Label>
              <Controller
                name={`shipment_items.${index}.cartons_quantity`}
                control={control}
                rules={{ required: "Cartons Quantity is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Input type="number" {...field} id={`shipment_items.${index}.cartons_quantity`} />
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.weight`} className="text-right">Weight (kg)</Label>
              <Controller
                name={`shipment_items.${index}.weight`}
                control={control}
                rules={{ required: "Weight is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Input type="number" step="0.01" {...field} id={`shipment_items.${index}.weight`} />
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.cbm`} className="text-right">CBM</Label>
              <Controller
                name={`shipment_items.${index}.cbm`}
                control={control}
                rules={{ required: "CBM is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Input type="number" step="0.01" {...field} id={`shipment_items.${index}.cbm`} />
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.per_quantity`} className="text-right">Per Quantity</Label>
              <Controller
                name={`shipment_items.${index}.per_quantity`}
                control={control}
                rules={{ required: "Per Quantity is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Per Quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        {perQuantityOptions?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.specification`} className="text-right">Specification</Label>
              <Controller
                name={`shipment_items.${index}.specification`}
                control={control}
                rules={{ required: "Specification is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Textarea {...field} id={`shipment_items.${index}.specification`} />
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.packing_remarks`} className="text-right">Packing Remarks</Label>
              <Controller
                name={`shipment_items.${index}.packing_remarks`}
                control={control}
                rules={{ required: "Packing Remarks is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Textarea {...field} id={`shipment_items.${index}.packing_remarks`} />
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.brand_type`} className="text-right">Brand Type</Label>
              <Controller
                name={`shipment_items.${index}.brand_type`}
                control={control}
                rules={{ required: "Brand Type is required" }}
                render={({ field, fieldState }) => (
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
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 mb-2">
              <Label htmlFor={`shipment_items.${index}.is_loaded`} className="text-right">Is Loaded</Label>
              <Controller
                name={`shipment_items.${index}.is_loaded`}
                control={control}
                rules={{ required: "Is Loaded is required" }}
                render={({ field, fieldState }) => (
                  <div className="col-span-3">
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Is Loaded" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
            {fields.length > 1 && (
              <div className="col-span-4 text-right">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove Item
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              item_id: "",
              cargo_type_id: "",
              cartons_quantity: "",
              weight: "",
              cbm: "",
              per_quantity: "Piece",
              specification: "",
              packing_remarks: "",
              brand_type: "Branded",
              is_loaded: "0",
              created_by_user_id: "1",
            })
          }
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Shipment Item
        </button>
      </div>
      <div className="text-right">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Submit Shipment
        </button>
      </div>
    </form>
  );
}