"use client"

import React, { useState, useEffect } from "react"
import {
  Briefcase,
  Trash2,
  Edit3,
  Plus,
  Users,
  MapPin,
  Globe,
  MoreVertical,
  Code,
  Palette,
  Server,
  Megaphone,
} from "lucide-react"
import Link from "next/link"
import { getJobs } from "@/lib/api/jobs"
import { deleteJob } from "@/lib/actions/job"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const getCategoryDetails = (category: string) => {
  switch (category?.toLowerCase()) {
    case "design & creative":
    case "design":
      return {
        icon: <Palette className="h-4 w-4 text-orange-400" />,
        color: "text-orange-400",
      }
    case "product & management":
    case "infrastructure":
      return {
        icon: <Server className="h-4 w-4 text-indigo-400" />,
        color: "text-indigo-400",
      }
    case "marketing & sales":
    case "marketing":
      return {
        icon: <Megaphone className="h-4 w-4 text-pink-400" />,
        color: "text-pink-400",
      }
    default:
      return {
        icon: <Code className="h-4 w-4 text-cyan-400" />,
        color: "text-cyan-400",
      }
  }
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs()
        setJobs(Array.isArray(data) ? data : data.jobs || [])
      } catch (error) {
        console.error("Failed to fetch jobs", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleDelete = async (jobId: string, jobTitle: string) => {
    try {
      await deleteJob(jobId)
      setJobs((prev) => prev.filter((job) => (job._id || job.id) !== jobId))
      toast.success(`Job "${jobTitle}" deleted successfully!`)
    } catch (error) {
      console.error("Failed to delete job", error)
      toast.error("Failed to delete the job. Please try again.")
    }
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#111113] p-6 text-zinc-100 md:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 text-xs font-medium text-zinc-400">
            Dashboard <span className="mx-1">&gt;</span>{" "}
            <span className="text-indigo-400">Manage Jobs</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Manage Job Listings
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#5558E6] sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Post New Job
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-800/80 bg-[#18181B] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-[#141417] text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                <th className="px-5 py-4">Job Title & Dept</th>
                <th className="px-5 py-4">Company & Location</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Compensation</th>
                <th className="px-5 py-4">Applicants</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Deadline</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-sm">
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="animate-pulse py-12 text-center text-zinc-400"
                  >
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-400">
                    <Briefcase className="mx-auto mb-2 h-8 w-8 stroke-[1.5] text-zinc-600" />
                    <p className="text-sm font-medium text-zinc-300">
                      No jobs found
                    </p>
                  </td>
                </tr>
              ) : (
                jobs.map((job: any) => {
                  const jobId = job._id || job.id
                  const catDetails = getCategoryDetails(job.category)
                  const isExpired =
                    job.status === "Expired" ||
                    (job.deadline && new Date(job.deadline) < new Date())

                  return (
                    <tr
                      key={jobId}
                      className="group transition hover:bg-zinc-800/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-[#222226]">
                            {catDetails.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-white">
                              {job.title}
                            </div>
                            <div
                              className={`mt-0.5 text-xs font-medium ${catDetails.color}`}
                            >
                              {job.category || "Engineering"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-zinc-200">
                          {job.companyName || "HirePulse Network"}
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400">
                          {job.isRemote ? (
                            <>
                              <Globe className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                              <span>
                                Remote ({job.location || "Worldwide"})
                              </span>
                            </>
                          ) : (
                            <>
                              <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                              <span>{job.location || "N/A"}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full border border-zinc-800 bg-[#222226] px-3 py-1 text-xs font-medium text-zinc-300">
                          {job.jobType || "Full-time"}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-zinc-200">
                        €{job.minSalary} – €{job.maxSalary} /{" "}
                        {job.frequency === "per hour"
                          ? "hr"
                          : job.frequency === "per month"
                            ? "mo"
                            : "yr"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 font-medium text-zinc-300">
                          <Users className="h-4 w-4 text-indigo-400" />
                          <span>{job.applicantsCount || 0} Candidates</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {isExpired ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>
                            Expired
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs font-medium text-zinc-200">
                          {job.deadline ? job.deadline.split("T")[0] : "N/A"}
                        </div>
                        <div className="mt-0.5 text-[11px] text-zinc-500">
                          {isExpired ? "Closed" : "Active listing"}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#222226] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                            title="Update Job"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
                            Update
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                                title="Delete Job"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border border-zinc-800 bg-[#18181B] text-zinc-100">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-zinc-400">
                                  This action cannot be undone. This will
                                  permanently delete the job listing
                                  <span className="font-semibold text-white">
                                    {" "}
                                    "{job.title}"
                                  </span>{" "}
                                  from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(jobId, job.title)}
                                  className="bg-red-600 font-medium text-white hover:bg-red-700"
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <button
                            className="cursor-pointer rounded-lg border border-zinc-800 bg-[#222226] p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
                            title="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
