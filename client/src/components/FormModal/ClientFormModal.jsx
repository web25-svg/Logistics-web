// src/components/FormModal/FormModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./ClientFormFields";
import { Button } from "../ui/button";

export default function FormModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      alias: "",
      phone: "",
      whatsapp_phone: "",
      address: "",
      status: "1",
      is_active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
      status: initialData.status === 1 || initialData.status === "1" ? "active" : "inactive",
      });
    } else {
      reset({
        name: "",
        alias: "",
        phone: "",
        whatsapp_phone: "",
        address: "",
        status: "1",
        is_active: true,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    const payload = {
      name: data.name,
      alias: data.alias,
      phone: data.phone,
      whatsapp_phone: data.whatsapp_phone,
      address: data.address,
      is_active: data.is_active ? 1 : 0,
      status: data.status === "active" ? 1 : 0,
      created_by_user_id: 1, // or fetch from auth context
      referral_user_id: null, // or fetch from auth context
    };
  
    await onSubmit(payload);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Item" : "Create New Item"}
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
