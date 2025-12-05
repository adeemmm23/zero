"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { type MessageType } from "./for_messenger/types";
import Body from "./for_messenger/body";
import Input from "./for_messenger/input";
import Head from "./for_messenger/head";

export default function Messenger() {
  const [messages, setMessages] = useState<MessageType[]>(() => [
    {
      // TODO: handle non pure function
      id: Date.now(),
      content: "What can I help you with?",
      isSender: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // TODO: Better optimazation
    if (window.innerWidth < 768) return;
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <aside
      className={cn(
        "border-foreground/5 bg-card fixed right-5 bottom-5 z-20 hidden flex-col overflow-clip rounded-2xl border transition-all duration-300 md:flex",
        isMinimized ? "h-14 w-[16rem]" : "h-120 w-88",
        isInView ? "translate-y-0" : "translate-y-[calc(100%+1.25rem)]"
      )}
      aria-label="Chat with us"
    >
      <Head
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
      <Body messages={messages} isLoading={isLoading} />
      <Input
        messages={messages}
        setMessages={setMessages}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        isMuted={isMuted}
      />
    </aside>
  );
}
