import { Car, File, PenLine, Download } from "lucide-react";
import Card from "../(components)/card";

export default function Steps() {
  return (
    <div className="w-full flex justify-center px-5 xl:px-0 py-20">
      <div className="w-[70rem]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card
            icon={<File />}
            header="Choose a template"
            description="Browse our collection of professionally designed templates, perfectly tailored for various industries."
            subHeader="Step 1"
            pattern="grid"
          />
          <Card
            icon={<PenLine />}
            header="Fill in Your Details"
            description="Enter your information, work experience, and skills. The intuitive editor guides you through every step."
            subHeader="Step 2"
            pattern="dot"
          />
          <Card
            icon={<Download />}
            header="Download & Apply"
            description="Download your CV in high-quality PDF format and start applying for your dream job!"
            subHeader="Step 3"
            pattern="ripple"
          />
        </div>
      </div>
    </div>
  );
}
