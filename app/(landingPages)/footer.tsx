import { FileCode2 } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full flex justify-center py-20 border-t bg-zinc-50 px-5 xl:px-0">
      <div className="w-[70rem]">
        <h1 className="font-bold tracking-tight text-zinc-600 flex gap-2 items-center">
          <FileCode2 />
          CV Maker Indo.
        </h1>
      </div>
    </div>
  );
}
