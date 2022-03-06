import { Contact } from "./contact/contact";

export interface Conversation {
    id?: number;
    clientId?: string;
    name?: string;
    //creatorId?: string;
    //partnerId?: string;
    //partnerUsername?: string;
    Contact?: Contact;
}