import { Conversation } from "./conversation";

export interface Message {
    id?: number;
    clientId?: string;
    text: string;
    partnerUsername?: string;
    conversationId?: number;
    clientConversationId?: string;
    Conversation?: Conversation;
}