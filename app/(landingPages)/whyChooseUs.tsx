import Card from "../(components)/card";
import {
  FileCheck2,
  UserRoundPen,
  Clock,
  CircleDollarSign,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div className="w-full flex justify-center px-5 xl:px-0">
      <div className="w-[80rem]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tighter text-center bg-gradient-to-l from-zinc-900 to-zinc-300 bg-clip-text text-transparent">
            Designed to Simplify, Built to Impress
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-7">
          <Card
            className="flex flex-col items-center text-center"
            icon={<FileCheck2 />}
            header="Professional Designs"
            description="Stand out with modern, eye-catching templates."
          />
          <Card
            className="flex flex-col items-center text-center"
            icon={<UserRoundPen />}
            header="Easy to Use"
            description="No technical skills required—our platform is built for everyone."
          />
          <Card
            className="flex flex-col items-center text-center"
            icon={<Clock />}
            header="Save Time"
            description="Generate your CV in minutes, not hours."
          />
          <Card
            className="flex flex-col items-center text-center"
            icon={<CircleDollarSign />}
            header="100% Free"
            description="Access all features at no cost—no hidden fees, no premium upgrades."
          />
        </div>
      </div>
    </div>
  );
}
