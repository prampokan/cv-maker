import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full flex justify-center pt-44 pb-20 px-5 sm:px-0">
      <div className="w-[70rem] h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter max-w-[20rem] sm:max-w-[30rem] text-center leading-tight bg-gradient-to-l from-zinc-900 to-zinc-400 bg-clip-text text-transparent">
          Built your CV with just few clicks.
        </h1>
        <p className="max-w-[26rem] sm:max-w-[30rem] text-center text-xl my-10 text-zinc-500 leading-relaxed">
          Create stunning CVs in minutes, designed to make an impact. No design
          skills required just your information and a few clicks.
        </p>
        <Link href="#templates">
          <RainbowButton>Start Your CV Now!</RainbowButton>
        </Link>
      </div>
    </div>
  );
}
