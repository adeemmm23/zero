export type MessageType = {
  id: number;
  content: string;
  isSender: boolean;
  isError?: boolean;
};
