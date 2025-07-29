// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/DataTable";
import FormModal from "../components/FormModal/FormModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { fetchItems, createItem, updateItem, deleteItem } from "../utils/api";

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
      const data = await fetchItems();      
      setItems(data?.findAllContainer);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      await createItem(itemData);
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating item:", error.message);
    }
  };

  const handleUpdate = async (id, itemData) => {
    try {
      await updateItem(id, itemData);
      await loadItems();
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
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
        <h1 className="text-2xl font-bold">Container</h1>
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
