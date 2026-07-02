export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'elara' | 'julian' | 'maya';
  senderName: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  platform: 'whatsapp' | 'linkedin' | 'instagram' | 'facebook';
  scheduledTime: string;
  day: number; // Day of the month (e.g. 12, 13, 14)
  dayName: string; // e.g., 'LUN', 'MAR'
  status: 'draft' | 'scheduled' | 'published';
  attachments?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  leaveBalance: number; // Solde congés
  contractType: string; // CDI, CDD, etc.
  entryDate: string; // Date d'entrée
  recentActivity: string;
  email: string;
}
