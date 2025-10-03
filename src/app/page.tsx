"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppHeader from "@/components/header";
import { mockChatSessions, mockMessages } from "@/lib/mock-data";
import type { ChatMessage, ChatSession } from "@/lib/types";
import ChatWelcome from "@/components/chat/chat-welcome";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";

export default function Home() {
  const [activeSession, setActiveSession] =
    React.useState<ChatSession | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isAiResponding, setIsAiResponding] = React.useState(false);

  const handleSessionSelect = (session: ChatSession) => {
    setActiveSession(session);
    setMessages(mockMessages.filter((m) => m.sessionId === session.id));
  };
  
  const handleNewChat = () => {
    setActiveSession(null);
    setMessages([]);
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: activeSession?.id || "new-session",
      content,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAiResponding(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sessionId: activeSession?.id || "new-session",
        content:
          "This is a simulated response. The knowledge base is currently being updated. [^1] Some features, like real-time data fetching, are not yet implemented. [^2]",
        role: "assistant",
        timestamp: new Date().toISOString(),
        sources: [
          {
            id: "src-1",
            name: "Internal Documentation #451",
          },
          {
            id: "src-2",
            name: "System Status Page",
          },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsAiResponding(false);
    }, 1500);
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="offcanvas" className="z-20">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleNewChat} isActive={!activeSession} >New Chat</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mockChatSessions.map((session) => (
              <SidebarMenuItem key={session.id}>
                <SidebarMenuButton
                  onClick={() => handleSessionSelect(session)}
                  isActive={activeSession?.id === session.id}
                  className="truncate"
                >
                  {session.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col max-h-screen">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          {!activeSession && messages.length === 0 ? (
            <ChatWelcome />
          ) : (
            <ChatMessages messages={messages} isAiResponding={isAiResponding} />
          )}
        </main>
        <div className="p-4 bg-background/80 backdrop-blur-sm">
          <ChatInput onSendMessage={handleSendMessage} disabled={isAiResponding} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
