"use client";

import { Download, Menu } from "lucide-react";
import { useCallback } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { formatConversationAsMarkdown } from "@/features/chat";

interface ChatMessage {
  role: string;
  content: string;
}

interface ChatHeaderProps {
  title: string | null;
  messages: ChatMessage[];
  onToggleSidebar: () => void;
}

export function ChatHeader({ title, messages, onToggleSidebar }: ChatHeaderProps) {
  const displayTitle = title ?? "New Chat";

  const handleExport = useCallback(() => {
    const markdown = formatConversationAsMarkdown(displayTitle, messages);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${displayTitle}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [displayTitle, messages]);

  return (
    <header className="flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </Button>
        <h1 className="truncate text-lg font-semibold">{displayTitle}</h1>
      </div>
      <div className="flex items-center gap-1">
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExport}
            aria-label="Export conversation"
          >
            <Download className="size-5" />
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
