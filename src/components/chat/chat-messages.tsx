import type { ChatMessage } from "@/lib/types";
import ChatBubble from "./chat-bubble";
import Waveform from "../icons/waveform";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isAiResponding: boolean;
}

export default function ChatMessages({ messages, isAiResponding }: ChatMessagesProps) {
  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isAiResponding && (
        <div className="flex justify-start">
          <div className="bg-card rounded-lg p-3 flex items-center space-x-2">
            <Waveform className="w-10 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
}
