// src/components/FormModal/FormModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./ItemFormFields.jsx";
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
      address: "",
      status: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: "",
        address: "",
        status: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    const payload = {
      name: data.name,
      address: data.address,
      address: data.address,
      status: data.status === "active" ? 1 : 0,
      created_by_user_id: 1, // or fetch from auth context
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
