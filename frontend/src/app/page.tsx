import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(300px,38%)_minmax(0,1fr)]">
      {/* Left sidebar */}
      <aside className="w-full lg:sticky lg:top-0 lg:h-screen">
        <div className="h-full px-6 py-10 lg:flex lg:flex-col lg:justify-between lg:px-10 lg:py-16">
          <About />
        </div>
      </aside>

      {/* Right content */}
      <main className="min-w-0 w-full px-6 pb-20 lg:px-10 lg:py-16">
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