import { ReactNode } from "react";

interface CardProps {
  className?: string;
  icon: ReactNode;
  header: string;
  description: string;
  subHeader?: string;
}

export default function Card({
  className = "",
  icon,
  header,
  description,
  subHeader = "",
}: CardProps) {
  return (
    <div className={`py-5 ${className}`}>
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
    </div>
  );
}
