import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "../components/DashboardSidebar"

const DLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DLayout
