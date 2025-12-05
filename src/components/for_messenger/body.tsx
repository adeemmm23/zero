import { useEffect, useRef } from "react";
import Bubble, { Loading } from "./bubble";
import { MessageType } from "./types";

type BodyProps = {
  messages: MessageType[];
  isLoading: boolean;
};

export default function Body({ messages, isLoading }: BodyProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const firstMessageDate = new Date(messages[0]!.id);
  const formattedDate = firstMessageDate.toLocaleTimeString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    if (messages.length > 2) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  return (
    <div className="no-scrollbar flex h-full grow flex-col overflow-x-clip overflow-y-auto overscroll-contain">
      <div
        className="mt-auto flex w-full flex-col items-start justify-end gap-2 overflow-x-clip px-2 py-4"
        aria-live="polite"
      >
        <span
          suppressHydrationWarning
          className="text-foreground/75 mx-auto text-xs"
        >
          {formattedDate}
        </span>
        {messages.map((message) => (
          <Bubble
            key={message.id}
            message={message.content}
            isSender={message.isSender}
            isError={message.isError}
          />
        ))}
        {isLoading && <Loading />}
        <div ref={messagesEndRef} aria-hidden="true" className="h-0 w-full" />
      </div>
    </div>
  );
}
