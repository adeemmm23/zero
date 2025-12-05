import { cn } from "@/lib/utils";
import { MessageType } from "./types";
import { useState, useRef, useEffect } from "react";

type InputProps = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isMuted: boolean;
};

export default function Input({
  messages,
  setMessages,
  setIsLoading,
  isLoading,
  isMuted,
}: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // TODO: Check inputRef
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "1.5rem";
    }
  }, []);

  const sanitizeMessage = (message: string): string => {
    return message.replace(/\n{3,}/g, "\n\n").trim();
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "1.5rem";

      const scrollHeight = inputRef.current.scrollHeight;
      const minHeight = 24;
      const maxHeight = 120;

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      inputRef.current.style.height = `${newHeight}px`;
    }
  };

  const sendMessage = async (content: string) => {
    const sanitizedContent = sanitizeMessage(content);
    if (!sanitizedContent.trim() || isLoading) return;

    const userMessage: MessageType = {
      id: Date.now(),
      content: sanitizedContent,
      isSender: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      // Reset height when message is sent
      inputRef.current.style.height = "1.5rem";
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: [...messages],
          message: sanitizedContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const aiMessage: MessageType = {
        id: Date.now(),
        content: data.message,
        isSender: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        id: Date.now(),
        content: "Could we talk a bit later? I'm a little busy right now.",
        isSender: false,
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputValue(text);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  return (
    <form
      className="flex max-h-36 min-h-17 shrink-0 items-center justify-center gap-2 px-3 py-3"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <div className="bg-foreground/5 no-scrollbar flex h-full w-full items-center justify-center overflow-clip overflow-y-auto rounded-3xl rounded-bl-lg px-4 py-2">
        <textarea
          ref={inputRef}
          value={inputValue}
          placeholder="Type a message..."
          aria-label="Message input"
          className={cn(
            "text-foreground caret-primary placeholder:text-foreground/50 w-full resize-none bg-transparent whitespace-pre-wrap outline-none"
          )}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          style={{
            overflow: "hidden",
            height: "1.5rem",
            minHeight: "1.5rem",
            lineHeight: "1.5rem",
          }}
        />
      </div>
      <button
        type="submit"
        onClick={handleSend}
        disabled={isLoading || !sanitizeMessage(inputValue).trim()}
        className="bg-foreground/5 hover:bg-foreground/10 flex size-11 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-3xl rounded-br-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={isLoading ? "Waiting for response" : "Send message"}
      >
        <span
          className="symbols text-foreground/75 filled text-xl"
          aria-hidden="true"
        >
          {isLoading ? "thumb_up" : "reply"}
        </span>
      </button>
    </form>
  );
}
