"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

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
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"
import { authClient, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

type UserRole = "seeker" | "recruiter" | "admin"

function isUserRole(value: unknown): value is UserRole {
  return value === "seeker" || value === "recruiter" || value === "admin"
}

type DashboardMenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const MenuItemByRole: Record<UserRole, DashboardMenuItem[]> = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export default function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const user = session?.user
  const pathRole = pathname.startsWith("/dashboard/")
    ? pathname.split("/")[2]
    : undefined
  const role = isUserRole(pathRole)
    ? pathRole
    : isUserRole(user?.role)
      ? user.role
      : "seeker"

  const userName =
    user?.name || (role === "admin" ? "Alex Rivera" : "Alex Sterling")
  const userAvatar =
    user?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
          router.refresh()
        },
      },
    })
  }

  return (
    <Sidebar className="border-r border-neutral-800/80 bg-[#0a0a0a] text-white">
      {/* 1. HEADER: Logo (+ Admin Console subtitle only for admin) */}
      <SidebarHeader className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="HireLoop Logo"
            width={125}
            height={30}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>
        {role === "admin" && (
          <p className="mt-1.5 text-xs font-medium text-neutral-400">
            Admin Console
          </p>
        )}
      </SidebarHeader>

      {/* 2. CONTENT: Role-based Profile Card + Dynamic Menu */}
      <SidebarContent className="px-4 py-2">
        {/* Profile Card: Only for Seeker & Recruiter (Admin has it in Footer) */}
        {(role === "seeker" || role === "recruiter") && (
          <div className="mb-6 rounded-2xl border border-neutral-800/90 bg-neutral-900/60 p-3.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Image
                src={userAvatar}
                alt={userName}
                className="size-10 shrink-0 rounded-full border border-neutral-700 object-cover"
                width={40}
                height={40}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {role === "seeker" ? user?.name || "Seeker Portal" : userName}
                </p>
                <p className="truncate text-xs text-neutral-400">
                  {role === "seeker" ? "Professional Tier" : "Recruiter"}
                </p>
                {role === "recruiter" && (
                  <span className="mt-2 inline-block rounded-full border border-indigo-500/30 bg-indigo-950/50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
                    Premium account
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Navigation Links */}
        <SidebarGroup className="p-0">
          <SidebarMenu className="space-y-1.5">
            {MenuItemByRole[role].map((item) => {
              const isActive =
                pathname === item.url ||
                (item.id !== "dashboard" && pathname.startsWith(`${item.url}/`))

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isActive}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "border-l-2 border-indigo-500 bg-neutral-800/90 text-white shadow-sm"
                        : "text-neutral-400 hover:bg-neutral-900/80 hover:text-white"
                    }`}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. FOOTER: Strictly Role-Specific Actions */}
      <SidebarFooter className="p-4">
        {/* Seeker Footer: Post Resume Button + Logout */}
        {role === "seeker" && (
          <div className="space-y-3">
            <Button
              render={<Link href="/dashboard/seeker/resume/new" />}
              className="h-10 w-full rounded-xl bg-white text-sm font-semibold text-black shadow-md hover:bg-neutral-200"
            >
              Post Resume
            </Button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Admin Footer: Super Admin Profile Card */}
        {role === "admin" && (
          <div className="flex items-center gap-3 border-t border-neutral-800/80 pt-4">
            <Image
              src={userAvatar}
              alt={userName}
              className="size-9 shrink-0 rounded-full border border-neutral-700 object-cover"
              width={40}
              height={40}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {userName}
              </p>
              <p className="truncate text-xs text-neutral-400">Super Admin</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
