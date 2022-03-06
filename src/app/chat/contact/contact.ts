import { User } from "src/app/shared/models/user";
import { Conversation } from "../conversation";

export interface Contact extends User {
    username: string;
    //conversationId?: number;
    Conversation?: Conversation;
}