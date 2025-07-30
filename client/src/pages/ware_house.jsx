// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/WareHouseDataTable.jsx";
import FormModal from "../components/FormModal/SupplierFormModal.jsx";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { getAllWareHouses, createWareHouse, updateWareHouse, deleteWareHouse } from "../utils/ware-house-api.js";

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
      const data = await getAllWareHouses();
      setItems(data?.items);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      await createWareHouse(itemData);
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating item:", error.message);
    }
  };

  const handleUpdate = async (id, itemData) => {
    console.log("handleUpdate: ", itemData);

    try {
      await updateWareHouse(id, itemData);
      await loadItems();
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWareHouse(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openEditModal = (item) => {
    console.log("openEditModal: ", item); // return or all the data in db
    setCurrentItem(item);
    console.log("currentItem: ", currentItem); // return val null
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ware House</h1>
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
        onSubmit={
          currentItem
            ? (data) => handleUpdate(currentItem.id, data)
            : handleCreate
        }
        initialData={currentItem}
      />
    </div>
  );
};

export default Container;
