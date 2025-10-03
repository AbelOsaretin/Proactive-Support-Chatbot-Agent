export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  sources?: {
    id: string;
    name: string;
  }[];
}

export interface KnowledgeDocument {
  id: string;
  fileName: string;
  syncDate: string;
  status: "Active" | "Inactive" | "Error";
}

export interface UnansweredQuestion {
  id: string;
  theme: string;
  originalQuestion: string;
  createdAt: string;
}

export interface DraftArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
