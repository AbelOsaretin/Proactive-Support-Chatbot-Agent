import type { ChatSession, ChatMessage, KnowledgeDocument, UnansweredQuestion, DraftArticle } from './types';

export const mockChatSessions: ChatSession[] = [
  { id: 'session-1', title: 'How to reset my password?', createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'session-2', title: 'Billing issue on my last invoice.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'session-3', title: 'What are the new features?', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export const mockMessages: ChatMessage[] = [
    {
        id: 'msg-1',
        sessionId: 'session-1',
        content: 'How do I reset my password?',
        role: 'user',
        timestamp: new Date(Date.now() - 86400000 * 3 - 60000).toISOString(),
    },
    {
        id: 'msg-2',
        sessionId: 'session-1',
        content: "To reset your password, please go to the 'Account Settings' page and click on 'Forgot Password'.[^1]",
        role: 'assistant',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        sources: [{ id: 'src-1', name: 'User Manual, Section 4.2' }],
    },
    {
        id: 'msg-3',
        sessionId: 'session-2',
        content: 'There seems to be a billing issue on my last invoice.',
        role: 'user',
        timestamp: new Date(Date.now() - 86400000 * 2 - 60000).toISOString(),
    },
    {
        id: 'msg-4',
        sessionId: 'session-2',
        content: "I've reviewed your invoice. There was a calculation error that has now been corrected. A new invoice will be sent to you shortly.[^1][^2]",
        role: 'assistant',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        sources: [
            { id: 'src-1', name: 'Billing Policy Update Q2 2024' },
            { id: 'src-2', name: 'Internal Ticket #B-12345' }
        ],
    },
];

export const mockDocuments: KnowledgeDocument[] = [
  { id: 'doc-1', fileName: 'Onboarding_Guide_v2.pdf', syncDate: '2024-07-28', status: 'Active' },
  { id: 'doc-2', fileName: 'API_Reference_2024.docx', syncDate: '2024-07-27', status: 'Active' },
  { id: 'doc-3', fileName: 'Troubleshooting_Common_Errors.pdf', syncDate: '2024-07-26', status: 'Active' },
  { id: 'doc-4', fileName: 'Security_Protocols.md', syncDate: '2024-07-25', status: 'Active' },
];

export const mockUnansweredQuestions: UnansweredQuestion[] = [
  { id: 'fail-1', theme: 'Enterprise Licensing', originalQuestion: 'What are the pricing options for enterprise teams with more than 500 users?', createdAt: '2024-07-28' },
  { id: 'fail-2', theme: 'Data Residency', originalQuestion: 'Can we host our data in the EU region specifically?', createdAt: '2024-07-27' },
  { id: 'fail-3', theme: 'Custom Integrations', originalQuestion: 'Do you provide support for integrating with on-premise Active Directory?', createdAt: '2024-07-26' },
];

export const mockDraftArticles: DraftArticle[] = [
  { 
    id: 'draft-1', 
    title: 'Advanced Git & GitHub Integration', 
    content: '### Integrating with GitHub Actions\n\nTo integrate with GitHub Actions, you first need to generate a personal access token with `repo` and `workflow` scopes...\n\n### Handling Merge Conflicts\n\nWhen a merge conflict occurs, the system will automatically create a new branch `conflict/your-branch-name`... \n\n*This is an AI-generated draft.*', 
    createdAt: '2024-07-25' 
  },
  { 
    id: 'draft-2', 
    title: 'Understanding Role-Based Access Control (RBAC)', 
    content: '### Default Roles\n\nThe system comes with three default roles: Admin, Editor, and Viewer. \n- **Admin**: Full access to all settings and content.\n- **Editor**: Can create and edit content but cannot change system settings.\n- **Viewer**: Read-only access.\n\n### Creating Custom Roles\n\nTo create a custom role, navigate to `Settings > Roles` and click "New Role"... \n\n*This is an AI-generated draft.*', 
    createdAt: '2024-07-24' 
  },
];
