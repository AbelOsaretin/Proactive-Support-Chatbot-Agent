# **App Name**: Abel AI Interface

## Core Features:

- Chat Interface: Provides a real-time chat interface for users to interact with the AI, displaying user messages and AI responses in a clear, threaded format.
- Chat History: Allows users to view and revisit previous conversation sessions, enhancing context and continuity across interactions, populated from n8n_chat_histories in Supabase.
- AI Text Generation Integration: Connects to the n8n workflow to process user inputs and receive AI-generated responses based on the current knowledge base. Displays source citations in the AI's responses as footnotes, referencing a numbered list of sources at the bottom of each message.
- Document Management Dashboard: Enables administrators to manage and monitor the status of documents synced to the vector store, displaying file names (from metadata->>'fileId'), sync dates (from the metadata JSONB field), and statuses sourced from the documents table in Supabase.
- Knowledge Gap Analysis: Presents unanswered user questions and AI-generated draft articles, facilitating identification and resolution of knowledge gaps through records from the n8n_chat_failures Supabase table. The LLM acts as a tool in identifying draft articles for review.

## Style Guidelines:

- Primary background: Very dark grey (#101010) to maintain a dark mode theme.
- Component/Card Backgrounds: Slightly lighter dark grey (#1C1C1E) for a subtle depth effect.
- Accent Colors: Linear gradient from bright magenta (#E600FF) to deep purple (#6F00FF) for primary buttons and highlights.
- Font: 'Inter', a clean, modern sans-serif font for a sleek and AI-centric visual identity. Headings in bold, body text in regular weight.
- Use a minimalist, line-art icon set (e.g., Feather Icons or Phosphor Icons) to complement the clean design.
- Employ rounded corners for buttons and cards, enhancing the modern aesthetic.
- Incorporate a glowing pink/purple waveform graphic on the chat page during AI processing or 'listening'.