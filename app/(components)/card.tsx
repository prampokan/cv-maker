import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import DotPattern from "@/components/ui/dot-pattern";
import Ripple from "@/components/ui/ripple";

interface CardProps {
  pattern?: string;
  icon: ReactNode;
  header: string;
  description: string;
  subHeader?: string;
}

export default function Card({
  pattern,
  icon,
  header,
  description,
  subHeader = "",
}: CardProps) {
  return (
    <div className="relative rounded-2xl border p-5 overflow-hidden">
      <div className="w-12 h-12 rounded-full flex justify-center items-center bg-sky-100 text-sky-500">
        {icon}
      </div>
      {subHeader && (
        <p className="text-sky-400 font-medium text-sm mt-3">{subHeader}</p>
      )}
      <h1 className="text-2xl text-zinc-700 font-semibold tracking-tight my-4">
        {header}
      </h1>
      <p className="leading-relaxed text-zinc-500">{description}</p>
      {pattern === "grid" ? (
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)] "
          )}
        />
      ) : pattern === "dot" ? (
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
          )}
        />
      ) : pattern === "ripple" ? (
        <Ripple />
      ) : (
        ""
      )}
    </div>
  );
}
