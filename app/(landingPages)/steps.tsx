import { Car, File, PenLine, Download } from "lucide-react";
import Card from "../(components)/card";

export default function Steps() {
  return (
    <div className="w-full flex justify-center px-5 xl:px-0 pt-32">
      <div className="w-[70rem]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter text-center bg-gradient-to-l from-zinc-900 to-zinc-300 bg-clip-text text-transparent">
            From Template to Download in Just Minutes
          </h1>
          <p className="w-full sm:w-[40rem] text-center text-xl my-5 text-zinc-500 leading-relaxed">
            Building a professional CV has never been easier. Follow these quick
            steps and get job-ready today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          <Card
            icon={<File />}
            header="Choose a template"
            description="Browse our collection of professionally designed templates, perfectly tailored for various industries."
            subHeader="Step 1"
          />
          <Card
            icon={<PenLine />}
            header="Fill in Your Details"
            description="Enter your information, work experience, and skills. The intuitive editor guides you through every step."
            subHeader="Step 2"
          />
          <Card
            icon={<Download />}
            header="Download & Apply"
            description="Download your CV in high-quality PDF format and start applying for your dream job!"
            subHeader="Step 3"
          />
        </div>
      </div>
    </div>
  );
}
