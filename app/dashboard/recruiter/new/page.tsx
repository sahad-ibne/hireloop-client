"use client"

import React, { useState } from "react"
import {
  ArrowRight,
  Building2,
  Globe,
  MapPin,
  Calendar,
  Euro,
  ChevronDown,
} from "lucide-react"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "per hour",
    responsibilities: "",
    requirements: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Publishing Job:", formData)
    // Ekhane tomar backend API call (POST /jobs) add korbe
  }

  return (
    <div className="min-h-screen bg-[#111113] p-6 text-zinc-100 md:p-10">
      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
        {/* Top Breadcrumb & Header */}
        <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 text-xs font-medium text-zinc-400">
              Manage Jobs <span className="mx-1">&gt;</span>{" "}
              <span className="text-indigo-400">Create New Listing</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-[#5558E6] sm:self-auto"
          >
            Publish Job
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Section 1: Basic Information */}
        <div className="space-y-5 rounded-xl border border-zinc-800/80 bg-[#18181B] p-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <h2 className="text-sm font-semibold text-zinc-100">
              1. Basic Information
            </h2>
          </div>

          {/* Job Title */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-300">
              Job Title <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Frontend Developer"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-800 bg-[#222226] px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
            />
          </div>

          {/* Company Name & Job Category */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Company Name <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="HirePulse Network"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-800 bg-[#222226] py-2.5 pr-4 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Job Category <span className="text-indigo-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-[#222226] px-4 py-2.5 text-sm text-zinc-100 transition outline-none focus:border-indigo-500"
                >
                  <option value="Engineering & Tech">Engineering & Tech</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Product & Management">
                    Product & Management
                  </option>
                  <option value="Marketing & Sales">Marketing & Sales</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Job Type Pills */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-300">
              Job Type <span className="text-indigo-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {JOB_TYPES.map((type) => {
                const isSelected = formData.jobType === type
                return (
                  <button
                    type="button"
                    key={type}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, jobType: type }))
                    }
                    className={`cursor-pointer rounded-lg border px-4 py-2.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-zinc-800 bg-[#222226] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Section 2: Location, Compensation & Timeline */}
        <div className="space-y-5 rounded-xl border border-zinc-800/80 bg-[#18181B] p-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <h2 className="text-sm font-semibold text-zinc-100">
              2. Location, Compensation & Timeline
            </h2>
          </div>

          {/* Remote Work Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#222226] p-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-100">
                  Remote Work Allowed (isRemote)
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-400">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={formData.isRemote}
              onClick={() =>
                setFormData((prev) => ({ ...prev, isRemote: !prev.isRemote }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                formData.isRemote ? "bg-indigo-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                  formData.isRemote ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Location & Application Deadline */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-300">
                  Job Location (location)
                </label>
                <span className="text-[11px] text-zinc-500">Required</span>
              </div>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="New York, USA"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-800 bg-[#222226] py-2.5 pr-4 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Application Deadline (deadline)
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-800 bg-[#222226] py-2.5 pr-4 pl-10 text-sm text-zinc-100 [color-scheme:dark] transition outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Min Salary, Max Salary, Frequency */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Min Salary / Rate
              </label>
              <div className="relative">
                <Euro className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="number"
                  name="minSalary"
                  placeholder="25"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-800 bg-[#222226] py-2.5 pr-4 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Max Salary / Rate
              </label>
              <div className="relative">
                <Euro className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="number"
                  name="maxSalary"
                  placeholder="40"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-800 bg-[#222226] py-2.5 pr-4 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-300">
                Frequency
              </label>
              <div className="relative">
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-[#222226] px-4 py-2.5 text-sm text-zinc-100 transition outline-none focus:border-indigo-500"
                >
                  <option value="per hour">per hour</option>
                  <option value="per month">per month</option>
                  <option value="per year">per year</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Responsibilities & Requirements */}
        <div className="space-y-5 rounded-xl border border-zinc-800/80 bg-[#18181B] p-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            <h2 className="text-sm font-semibold text-zinc-100">
              3. Responsibilities & Requirements
            </h2>
          </div>

          {/* Key Responsibilities */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-300">
              Key Responsibilities <span className="text-indigo-400">*</span>
            </label>
            <textarea
              name="responsibilities"
              required
              rows={4}
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              value={formData.responsibilities}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-[#222226] p-4 text-sm leading-relaxed text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
            />
          </div>

          {/* Qualifications & Requirements */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-300">
              Qualifications & Requirements{" "}
              <span className="text-indigo-400">*</span>
            </label>
            <textarea
              name="requirements"
              required
              rows={4}
              placeholder={`• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers`}
              value={formData.requirements}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-[#222226] p-4 text-sm leading-relaxed text-zinc-100 placeholder-zinc-500 transition outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
