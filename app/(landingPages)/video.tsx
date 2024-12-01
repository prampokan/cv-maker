import Image from "next/image";
import Safari from "@/components/ui/safari";

export default function Video() {
  return (
    <div className="w-full flex justify-center px-5 xl:px-0">
      <div className="w-[70rem]">
        <div className="h-full w-full border shadow-xl rounded-2xl overflow-hidden">
          <video autoPlay loop muted>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <Safari url="cvmakerindo.com" className="size-full" />
        </div>
      </div>
    </div>
  );
}
