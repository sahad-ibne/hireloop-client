import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { useSession } from "@/lib/auth-client"

const MenuItemByRole = {
  seeker: [],
  admin: [],
  recruiter: [],
}

const DashboardSidebar = () => {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role || "seeker"
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              //         MenuItemByRole[role].map((item) => (
              //   <SidebarMenuItem key={item.id}>
              //     <SidebarMenuButton render={<a href={item.url} />}>
              //       <item.icon />
              //       <span>{item.name}</span>
              //     </SidebarMenuButton>
              //   </SidebarMenuItem>
              //         ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar
