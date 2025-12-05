import Image from "next/image";
import { cn } from "@/lib/utils";

type HeadProps = {
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Head({
  isMinimized,
  setIsMinimized,
  isMuted,
  setIsMuted,
}: HeadProps) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between p-2 select-none",
        isMinimized ? "" : "border-primary/5 border-b"
      )}
    >
      <div className="flex h-full items-center gap-2">
        <div className="aspect-square h-full shrink-0 grow-0 overflow-clip rounded-full">
          <Image
            className="size-full object-cover"
            src="/images/cool.jpg"
            height={100}
            width={100}
            alt="Photo of Someone"
          />
        </div>
        <div className="flex flex-col justify-center gap-0.5">
          <span className="text-foreground text-base leading-4 font-normal">
            Nird Support
          </span>
          <span className="text-foreground/50 text-xs leading-3 font-normal">
            @0percentbigtech
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="hover:bg-primary/20 flex cursor-pointer items-center justify-center rounded-full p-1"
          type="button"
          aria-label={isMinimized ? "Expand messenger" : "Minimize messenger"}
          aria-expanded={!isMinimized}
        >
          <span className="symbols text-foreground text-xl" aria-hidden="true">
            {isMinimized ? "expand_content" : "collapse_content"}
          </span>
        </button>
      </div>
    </div>
  );
}
