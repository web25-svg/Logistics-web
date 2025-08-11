import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./ShipmentFormField.jsx";
import { Button } from "../ui/button";

export default function ShipmentItemFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      cartons_quantity: "",
      weight: "",
      cbm: "",
      per_quantity: "",
      specification: "",
      packing_remarks: "",
      brand_type: "",
      is_loaded: "0",
      status: "1",

      // ✅ Default foreign keys
      shipment_id: 19,
      item_id: 1,
      cargo_type_id: 1,
      created_by_user_id: 1,
      container_id: null,
      shipment_client_status_id: null,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        status: initialData?.status === 1 ? "1" : "0",
        is_loaded: initialData?.is_loaded === 1 ? "1" : "0",
      });
    } else {
      reset({
        cartons_quantity: "",
        weight: "",
        cbm: "",
        per_quantity: "",
        specification: "",
        packing_remarks: "",
        brand_type: "",
        is_loaded: "0",
        status: "1",

        // ✅ Default foreign keys
        shipment_id: 1,
        item_id: 1,
        cargo_type_id: 1,
        created_by_user_id: 1,
        container_id: 1,
        shipment_client_status_id: null,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append("cartons_quantity", data.cartons_quantity);
    formData.append("weight", data.weight);
    formData.append("cbm", data.cbm);
    formData.append("per_quantity", data.per_quantity);
    formData.append("specification", data.specification);
    formData.append("packing_remarks", data.packing_remarks);
    formData.append("brand_type", data.brand_type);
    formData.append("is_loaded", data.is_loaded);
    formData.append("status", data.status);

    // ✅ Foreign keys
    formData.append("shipment_id", data.shipment_id);
    formData.append("item_id", data.item_id);
    formData.append("cargo_type_id", data.cargo_type_id);
    formData.append("created_by_user_id", data.created_by_user_id);
    if (data.container_id !== null) {
      formData.append("container_id", data.container_id);
    }
    if (data.shipment_client_status_id !== null) {
      formData.append(
        "shipment_client_status_id",
        data.shipment_client_status_id
      );
    }

    if (initialData?.id) {
      await onSubmit(initialData.id, formData);
    } else {
      await onSubmit(formData);
    }

    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Shipment Item" : "Add Shipment Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormFields control={control} />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
