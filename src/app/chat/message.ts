export interface Message {
    id?: number;
    conversationId?: number;
    author?: string;
    text: string;
}