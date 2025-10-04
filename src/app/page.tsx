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

  const handleSendMessage = async (content: string) => {
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

    try {
      // Send message to n8n webhook
      const response = await fetch('http://localhost:5678/webhook/f65ae4e9-6c8f-4b5a-9a52-b473470d0470', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          sessionId: activeSession?.id || "new-session",
          timestamp: new Date().toISOString(),
          userId: "user-1"
        }),
      });

      if (response.ok) {
        const webhookResponse = await response.json();
        
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sessionId: activeSession?.id || "new-session",
          content: webhookResponse.reply || webhookResponse.response || webhookResponse.message || "Response received from webhook",
          role: "assistant",
          timestamp: new Date().toISOString(),
          sources: webhookResponse.sources || [],
        };
        
        setMessages((prev: ChatMessage[]) => [...prev, aiResponse]);
      } else {
        const errorResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sessionId: activeSession?.id || "new-session",
          content: "Sorry, there was an error processing your message. Please try again.",
          role: "assistant",
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prev: ChatMessage[]) => [...prev, errorResponse]);
      }
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      const errorResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sessionId: activeSession?.id || "new-session",
        content: `Error: ${errorMessage}`,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev: ChatMessage[]) => [...prev, errorResponse]);
    } finally {
      setIsAiResponding(false);
    }
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
