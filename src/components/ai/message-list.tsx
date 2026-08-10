"use client";

import { useEffect, useRef } from "react";
import { ChatBubble } from "@/components/ai/chat-bubble";
import type { ChatMessage } from "@/types";

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
        <div className="text-2xl">👋</div>
        <p className="text-sm">你好！我是 AI 学习助手，有什么可以帮你？</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} message={msg} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
