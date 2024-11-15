

export type Chat = {
  id: number;
  name: string;
  type?: 'individual' | 'group';
  status?: 'online' | 'offline';
  lastMessage: string;
};