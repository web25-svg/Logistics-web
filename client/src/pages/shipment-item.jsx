// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/ShipmentItemDataTable.jsx";
import FormModal from "../components/FormModal/ShipmentItemFormModel.jsx";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
  getAllShipmentItems,
  createShipmentItem,
  updateShipmentItem,
  deleteShipmentItem,
} from "../utils/shipment-item-api.js";

const Container = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllShipmentItems();
      setItems(data?.shipmentItems);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      for (let pair of formData.entries()) {
        // console.log(pair[0] + ": " + pair[1]); // 🔍 Debug
      }
      await createShipmentItem(formData);
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating item:", error.message);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      for (let pair of formData.entries()) {
        // console.log(pair[0] + ": " + pair[1]);
      }

      await updateShipmentItem(id, formData);
      await loadItems();
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleDelete = async (id) => {
    // console.log("id: ", id);
    
    try {
      await deleteShipmentItem(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipment Item</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <DataTable
        data={items}
        loading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentItem(null);
        }}
        onSubmit={currentItem ? handleUpdate : handleCreate} 
        initialData={currentItem}
      />
    </div>
  );
};

export default Container;
