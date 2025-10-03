"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as FormEvent);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Textarea
        placeholder="Send message..."
        className="min-h-0 resize-none"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
             <Button variant="ghost" size="icon" disabled>
                <Mic />
                <span className="sr-only">Voice input</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice input coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button type="submit" variant="gradient" size="icon" disabled={disabled || !message.trim()}>
        <Send />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
