import { User } from "src/app/shared/models/user";

export interface Contact extends User {
    isOnline: boolean;
}