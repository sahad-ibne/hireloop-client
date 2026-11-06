import Image from "next/image"
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Star,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const stats = [
    { id: 1, value: "50K", label: "Active Jobs", icon: Briefcase },
    { id: 2, value: "12K", label: "Companies", icon: Building2 },
    { id: 3, value: "2M", label: "Job Seekers", icon: Users },
    { id: 4, value: "97%", label: "Satisfaction Rate", icon: Star },
  ]

  const trendingTags = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ]

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden pt-8 pb-20 text-white md:min-h-[760px] md:pt-12">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/globe.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-[#090909]/20 to-[#090909]/95" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        {/* Top Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/90 px-3.5 py-1.5 font-mono text-xs tracking-wider text-neutral-300 shadow-lg backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-orange-500" />
          <span>50,000+ NEW JOBS THIS MONTH</span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Subheadline */}
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base md:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <div className="mb-6 flex w-full max-w-3xl flex-col items-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl sm:p-2.5 md:flex-row md:rounded-full">
          <div className="flex w-full items-center gap-3 border-b border-neutral-800 px-4 py-2 md:border-b-0 md:py-0">
            <Search className="h-4 w-4 shrink-0 text-neutral-500 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Job title, skill or company"
              className="h-9 w-full border-none bg-transparent p-0 text-sm text-white shadow-none placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="hidden h-8 w-[1px] shrink-0 bg-neutral-800 md:block" />

          <div className="flex w-full items-center gap-3 px-4 py-2 md:py-0">
            <MapPin className="h-4 w-4 shrink-0 text-neutral-500 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Location or Remote"
              className="h-9 w-full border-none bg-transparent p-0 text-sm text-white shadow-none placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            type="button"
            className="flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-indigo-600 p-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-500 md:w-auto md:rounded-full md:px-6"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="ml-2">Search Jobs</span>
          </Button>
        </div>

        {/* Trending Positions */}
        <div className="mb-20 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400">
          <span className="mr-1 text-neutral-500">Trending Position</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-neutral-800 bg-neutral-900/90 px-3 py-1 text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Middle Heading Text over Globe Arc */}
        <div className="mb-14 px-4">
          <h2 className="mx-auto max-w-xl text-xl leading-snug font-medium tracking-tight text-neutral-100 drop-shadow-md sm:text-2xl md:text-3xl">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000 job seekers</span>{" "}
            find their dream positions.
          </h2>
        </div>

        {/* Live Stats Grid */}
        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className="flex flex-col items-start justify-between rounded-2xl border border-neutral-800/80 bg-neutral-950/90 p-5 text-left shadow-xl backdrop-blur-md transition-all hover:border-neutral-700 sm:p-6"
              >
                <div className="mb-5 rounded-xl border border-neutral-800 bg-neutral-900 p-2.5 text-neutral-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="mb-1 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-neutral-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
