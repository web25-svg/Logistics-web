// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/ShipmentDataTable.jsx";
// import FormModal from "../components/FormModal/ShipmentFormModel.jsx";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
  getAllShipments,
  // createShipment,
  // updateShipment,
  deleteShipment,
} from "../utils/shipment-api.js";
import { useNavigate } from "react-router-dom";
const Container = () => {
  const navigate = useNavigate();
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
      const data = await getAllShipments();
      setItems(data?.shipments);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCreate = async (formData) => {
  //   try {
  //     for (let pair of formData.entries()) {
  //       // console.log(pair[0] + ": " + pair[1]); // 🔍 Debug
  //     }
  //     await createShipment(formData);
  //     await loadItems();
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Error creating item:", error.message);
  //   }
  // };

  // const handleUpdate = async (id, formData) => {
  //   try {
  //     for (let pair of formData.entries()) {
  //       // console.log(pair[0] + ": " + pair[1]);
  //     }

  //     await updateShipment(id, formData);
  //     await loadItems();
  //     setIsModalOpen(false);
  //     setCurrentItem(null);
  //   } catch (error) {
  //     console.error("Error updating item:", error.message);
  //   }
  // };

  const handleDelete = async (id) => {
    // console.log("id: ", id);

    try {
      await deleteShipment(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // const openEditModal = (item) => {
  //   setCurrentItem(item);
  //   setIsModalOpen(true);
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Button onClick={() => navigate("/shipment-new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <DataTable
        data={items}
        loading={isLoading}
        onEdit={(item) => navigate(`/shipment-edit/${item.id}`)}
        onDelete={handleDelete}
      />

      {/* <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentItem(null);
        }}
        onSubmit={currentItem ? handleUpdate : handleCreate}
        initialData={currentItem}
      /> */}
    </div>
  );
};

export default Container;
