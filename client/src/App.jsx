import { Routes, Route } from "react-router-dom";
import data from "./data.json";
import Conatiner from "./Pages/Container.jsx";
import Item from "./pages/Item.jsx";
import Supplier from "./pages/supplier.jsx";
import WareHouse from "./pages/ware_house.jsx";
import Client from "./pages/client.jsx";
import Login from "./pages/login.jsx";
import PrivateRoute from "../src/components/pritate-route.jsx";
import DashboardLayout from "./components/dashboard-layout.jsx";
import { ChartAreaInteractive } from "./components/chart-area-interactive.jsx";
import { DataTable } from "./components/data-table.jsx";
import { SectionCards } from "./components/section-cards.jsx";

export default function App() {
  return (
    <Routes>
      {/* ✅ Login: without layout */}
      <Route path="/login" element={<Login />} />

      {/* ✅ Protected Routes with layout */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </DashboardLayout>
          }
        />
        <Route
          path="/container"
          element={
            <DashboardLayout>
              <Conatiner />
            </DashboardLayout>
          }
        />
        <Route
          path="/item"
          element={
            <DashboardLayout>
              <Item />
            </DashboardLayout>
          }
        />
        <Route
          path="/supplier"
          element={
            <DashboardLayout>
              <Supplier />
            </DashboardLayout>
          }
        />
        <Route
          path="/ware-house"
          element={
            <DashboardLayout>
              <WareHouse />
            </DashboardLayout>
          }
        />
        <Route
          path="/client"
          element={
            <DashboardLayout>
              <Client />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}
