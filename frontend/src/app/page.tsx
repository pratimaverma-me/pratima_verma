import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 
        LEFT SIDE

        Mobile:
        - Normal page content
        - Appears above the other sections

        Desktop:
        - Fixed to the left side
        - Does not move while scrolling
        - Uses 38% of the screen width
      */}
      <aside
        className="
          relative
          w-full
          px-6
          py-10

          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:w-[38%]
          lg:overflow-y-auto
          lg:px-10
          lg:py-16
        "
      >
        <About />
      </aside>

      {/*
        RIGHT SIDE

        Mobile:
        - Full width

        Desktop:
        - Starts after the fixed 38% left sidebar
        - Uses the remaining 62% width
      */}
      <main
        className="
          min-w-0
          w-full
          px-6
          pb-20

          lg:ml-[38%]
          lg:w-[62%]
          lg:px-10
          lg:py-16
        "
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-24">
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>
    </div>
  );
}