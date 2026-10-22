import { cn } from "@/shared/lib/tailwind-merge";
import { Outlet } from "react-router";
import {  Brain, BookOpen, MessageSquareText } from "lucide-react";
import Logo from "@/shared/components/logo/Logo";

const FEATURES = [
  {
    icon: Brain,
    title: "Tailored Diplomas",
    description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: BookOpen,
    title: "Focused Exams",
    description: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: MessageSquareText,
    title: "Smart Multi-Step Forms",
    description: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
] as const;

export default function AuthLayout() {
  return (
    <div className="grid px-4 sm:px-0 min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Features */}
      <section
        className={cn(
          // Base styles
          "relative hidden lg:flex items-center justify-center overflow-hidden bg-blue-100 backdrop-blur-xl",

          // Before
          "before:absolute before:top-14 before:-right-14 before:size-90 before:rounded-full before:bg-blue-200 before:blur-3xl",

          // After
          "after:absolute after:-bottom-40 after:-left-14 after:size-90 after:rounded-full after:bg-blue-200 after:blur-3xl",
        )}
      >
        <div className="relative z-10 mx-auto w-full max-w-114.5 px-6">
          {/* Logo */}
          <Logo/>

          {/* Headline */}
          <h1 className="mb-14 font-inter text-[1.8rem] max-w-114.5 font-bold text-gray-800 leading-none tracking-normal">
            Empower your learning journey with our smart exam platform.
          </h1>

          {/* Feature list */}
          <ul className="space-y-10">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-blue-600 text-blue-600">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-blue-600">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Auth Pages */}
      <main className="flex  items-center justify-center bg-white">
       
        <Outlet />
      </main>
    </div>
  );
}
