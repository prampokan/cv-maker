import { RainbowButton } from "@/components/ui/rainbow-button";

export default function Hero() {
  return (
    <div className="w-full flex justify-center pt-44 pb-32">
      <div className="w-[70rem] h-full flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold tracking-tighter w-[30rem] text-center leading-tight bg-gradient-to-l from-zinc-900 to-zinc-400 bg-clip-text text-transparent">
          Built your CV with just few clicks.
        </h1>
        <p className="w-[30rem] text-center text-xl my-10 text-zinc-500 leading-relaxed">
          Create stunning CVs in minutes, designed to make an impact. No design
          skills required just your information and a few clicks.
        </p>
        <RainbowButton>Start Your CV Now!</RainbowButton>
      </div>
    </div>
  );
}
