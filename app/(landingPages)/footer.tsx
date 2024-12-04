import { FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex justify-center pt-20 pb-10 border-t bg-zinc-50 px-5 xl:px-0">
      <div className="w-[70rem]">
        <h1 className="font-bold tracking-tight text-zinc-600 flex gap-2 items-center text-lg">
          <FileCode2 />
          CV Maker Indo.
        </h1>
        <Link href="https://github.com/prampokan/cv-maker" target="_blank">
          <Button className="mt-10">Star on Github⭐</Button>
        </Link>
        <p className="text-zinc-500 mt-8">
          © 2024 CV Maker Indo. All Rights Reserved.
        </p>
        <p className="text-zinc-300 text-sm mt-5">
          Built with ♡ by Pramudya Diagusta
        </p>
      </div>
    </div>
  );
}
