import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Routes, Route } from "react-router-dom";
import data from "./data.json";
import Conatiner from "./Pages/Container.jsx";
import Item from "./pages/Item.jsx";
import Supplier from "./pages/supplier.jsx";
import WareHouse from "./pages/ware_house.jsx";

export default function App() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Routes>
              {/* 👇 Home Route (Your existing dashboard layout) */}
              <Route
                path="/"
                element={
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <div className="px-4 lg:px-6">
                      <ChartAreaInteractive />
                    </div>
                    <DataTable data={data} />
                  </div>
                }
              />
              {/* Routes  */}
              <Route path="/container" element={<Conatiner />} />
              <Route path="/item" element={<Item />} />
              <Route path="/supplier" element={<Supplier />} />
              <Route path="/ware-house" element={<WareHouse />} />
            </Routes>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
