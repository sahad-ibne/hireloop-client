"use client"

import React, { useEffect, useState } from "react"
import {
  Briefcase,
  MapPin,
  Calendar,
  Trash2,
  Edit3,
  Search,
  Plus,
  Users,
} from "lucide-react"
import Link from "next/link"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch jobs from database backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${BASE_URL}/jobs`)
        const data = await res.json()
        setJobs(Array.isArray(data) ? data : data.jobs || [])
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return
    try {
      const res = await fetch(`${BASE_URL}/jobs/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== id && job.id !== id))
      } else {
        alert("Failed to delete job")
      }
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen space-y-6 bg-[#111113] p-6 text-zinc-100 md:p-10">
      {/* Top Header */}
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
            Monitor, edit, or remove active job listings posted across the
            network.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/new"
          className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#5558E6] sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Post New Job
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-[#18181B] p-4">
        <Search className="ml-1 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by job title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
        />
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {loading ? (
          <div className="rounded-xl border border-zinc-800/80 bg-[#18181B] p-12 text-center text-zinc-400">
            <p className="animate-pulse text-sm">
              Loading job listings from database...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/80 bg-[#18181B] p-12 text-center text-zinc-400">
            <Briefcase className="mx-auto mb-3 h-10 w-10 stroke-[1.5] text-zinc-600" />
            <p className="text-base font-medium text-zinc-300">No jobs found</p>
            <p className="mt-1 text-xs text-zinc-500">
              Post a new job to start receiving applications.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const jobId = job._id || job.id
            return (
              <div
                key={jobId}
                className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800/80 bg-[#18181B] p-5 transition-all hover:border-zinc-700 md:flex-row md:items-center"
              >
                {/* Job Info */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">
                      {job.title}
                    </h3>
                    <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-400">
                      {job.jobType}
                    </span>
                    {job.isRemote && (
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                        Remote
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      {job.location || "Remote / N/A"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      Deadline:{" "}
                      {job.deadline ? job.deadline.split("T")[0] : "N/A"}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-indigo-300">
                      €{job.minSalary} - €{job.maxSalary} {job.frequency}
                    </span>
                  </div>
                </div>

                {/* Actions & Applicants */}
                <div className="flex items-center justify-between gap-3 border-t border-zinc-800 pt-3 md:justify-end md:border-t-0 md:pt-0">
                  <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#222226] px-3 py-1.5 text-xs text-zinc-400">
                    <Users className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{job.applicantsCount || 0} Applicants</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Edit feature for: ${job.title}`)}
                      className="cursor-pointer rounded-lg border border-zinc-800 bg-[#222226] p-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                      title="Edit Job"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(jobId)}
                      className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                      title="Delete Job"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
