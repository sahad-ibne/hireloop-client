import Link from "next/link"
import Image from "next/image"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

export default function Navbar() {
  return (
    <header className="mx-auto w-full max-w-6xl px-4 py-4">
      <nav className="flex items-center justify-between rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-3 shadow-lg backdrop-blur-md sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="hireloop logo"
            width={140}
            height={32}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
          >
            Sign In
          </Link>
          <Button
            render={<Link href="/get-started" />}
            className="rounded-full bg-indigo-600 px-5 font-medium text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white md:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
            <span className="sr-only">Open navigation menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 max-w-[calc(100vw-2rem)] border-neutral-800 bg-neutral-900/95 text-neutral-300 backdrop-blur-md"
          >
            <SheetHeader className="p-4">
              <SheetTitle className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="hireloop logo"
                  width={140}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-neutral-800/60 hover:text-white"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <SheetFooter className="mt-auto flex-col gap-3 border-t border-neutral-800 p-4">
              <SheetClose
                render={
                  <Link
                    href="/sign-in"
                    className="rounded-lg py-2 text-center text-sm font-medium text-indigo-400 transition-colors duration-200 hover:bg-neutral-800/60 hover:text-indigo-300"
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/get-started"
                    className={cn(
                      buttonVariants(),
                      "w-full justify-center rounded-full bg-indigo-600 font-medium text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500"
                    )}
                  />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
