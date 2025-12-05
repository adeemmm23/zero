import { cn } from "@/lib/utils";

type BubbleProps = {
  message: string;
  isSender: boolean;
  isError?: boolean | undefined;
};

export default function Bubble({ message, isSender, isError }: BubbleProps) {
  return (
    <div
      data-yapping={isError && "Honestly, we ran out of quota"}
      className={cn(
        "animate-in fade-in flex max-w-2/3 flex-col rounded-3xl px-3 py-2 duration-300",
        isSender
          ? "slide-in-from-right-4 bg-primary text-primary-foreground ml-auto"
          : "slide-in-from-left-4 bg-primary/10 text-foreground",
      )}
    >
      <p className="w-full break-words whitespace-pre-wrap">{message}</p>
    </div>
  );
}

export function Loading() {
  return (
    <div className="bg-primary/10 text-foreground flex max-w-2/3 min-w-0 items-center justify-center rounded-3xl px-3 py-2">
      <div className="flex h-6 items-center justify-center gap-1">
        <div
          className="bg-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ animationDelay: "0.0s" }}
        ></div>
        <div
          className="bg-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="bg-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
