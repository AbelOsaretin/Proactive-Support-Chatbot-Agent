import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface ChatBubbleProps {
  message: ChatMessage;
}

// A simple function to parse content for footnotes like [^1] and return React nodes
const parseFootnotes = (content: string) => {
  const parts = content.split(/(\[\^\d+\])/g);
  return parts.map((part, index) => {
    const match = part.match(/\[\^(\d+)\]/);
    if (match) {
      const number = match[1];
      return (
        <sup key={index} className="font-semibold text-primary">
          <a href={`#source-${number}`} className="no-underline">
            {number}
          </a>
        </sup>
      );
    }
    return part;
  });
};

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xl rounded-lg p-3 text-white",
          isUser
            ? "bg-accent-gradient"
            : "bg-card text-card-foreground"
        )}
      >
        <div className="whitespace-pre-wrap text-sm">
          {parseFootnotes(message.content)}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 border-t border-white/20 pt-2">
            <ol className="list-inside list-none space-y-1 text-xs">
              {message.sources.map((source, index) => (
                <li key={source.id} id={`source-${index + 1}`} className="text-muted-foreground">
                  <span className="font-semibold text-primary">{index + 1}.</span> {source.name}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
