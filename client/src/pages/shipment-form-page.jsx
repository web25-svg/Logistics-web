import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createShipment,
  updateShipment,
  getShipmentById,
} from "../utils/shipment-api.js";
import CreateShipment from "../pages/create-shipment.jsx";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ShipmentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const user = useSelector((state) => state.auth.user);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      shipment_tracking_id: "",
      recipt_no: "",
      recieved_from: "",
      marka: "",
      client_id: "",
      fully_loading_date: "",
      receiving_airport_id: "",
      total_kgs: "",
      total_cartons: "",
      total_cbm: "",
      rate: "",
      total_receivable_amount: "",
      description: "",
      status: "1",
      is_loaded: "0",
      air_way_bill_image: null,
      shipment_items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shipment_items",
  });

  useEffect(() => {
    if (isEditMode) {
      getShipmentById(id)
        .then((res) => {
          if (res?.shipment) {
            reset({
              shipment_tracking_id: res.shipment.shipment_tracking_id || "",
              recipt_no: res.shipment.recipt_no || "",
              recieved_from: res.shipment.recieved_from || "",
              marka: res.shipment.marka || "",
              client_id: res.shipment.client_id || "",
              fully_loading_date: res.shipment.fully_loading_date
                ? res.shipment.fully_loading_date.split("T")[0]
                : "",
              receiving_airport_id: res.shipment.receiving_airport_id || "",
              total_kgs: res.shipment.total_kgs || "",
              total_cartons: res.shipment.total_cartons || "",
              total_cbm: res.shipment.total_cbm || "",
              rate: res.shipment.rate || "",
              total_receivable_amount:
                res.shipment.total_receivable_amount || "",
              description: res.shipment.description || "",
              status: String(res.shipment.status ?? "1"),
              air_way_bill_image: null,
              shipment_items: (res.shipment.shipment_items || []).map(
                (item) => ({
                  ...item,
                  // Ensure these fields are strings, fallback if not present
                  status: String(item.status ?? "1"),
                  cargo_type_id: item.cargo_type_id ?? "",
                  is_loaded: String(item.is_loaded ?? "0"),
                })
              ),
            });
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error loading shipment");
          console.error(err.message);
        });
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      const shipmentItemsWithUser = data.shipment_items.map((item) => ({
        ...item,
        created_by_user_id: user?.id,
      }));

      const formData = new FormData();

      // Append other fields except shipment_items and air_way_bill_image
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "shipment_items" && key !== "air_way_bill_image") {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });

      // Append shipment_items as JSON string
      formData.append("shipment_items", JSON.stringify(shipmentItemsWithUser));

      // Append air_way_bill_image file if selected
      if (data.air_way_bill_image) {
        formData.append("air_way_bill_image", data.air_way_bill_image);
      }

      // Add created_by_user_id at shipment level
      formData.append("created_by_user_id", user?.id);

      if (isEditMode) {
        await updateShipment(id, formData);
      } else {
        await createShipment(formData);
      }
      navigate("/shipment");
    } catch (err) {
      toast.error("Error saving shipment");
      console.error(err.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateShipment
          control={control}
          fields={fields}
          append={append}
          remove={remove}
        />
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditMode ? "Update Shipment" : "Create Shipment"}
          </button>
        </div>
      </form>
    </div>
  );
}
