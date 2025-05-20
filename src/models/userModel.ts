import type { Identifiable, IdType } from "../types/commonTypes";

export type UserRole = 'admin' | 'user';
export type AccountStatus = 'active' | 'suspended' | 'deactivated';

export interface User extends Identifiable<IdType> {
    name: string;
    username: string;
    password: string;
    gender: string;
    role?: UserRole;
    img_url?: string;
    bio?: string;
    status: AccountStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserModel implements User {
    static className = "user";
    
    id: IdType;
    name: string;
    username: string;
    password: string;
    gender: string;
    role?: UserRole;
    img_url?: string;
    bio?: string;
    status: AccountStatus;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
        this.id = crypto.randomUUID();
        this.name = user.name;
        this.username = user.username;
        this.password = user.password;
        this.gender = user.gender;
        this.role = user.role || "user";
        this.img_url = user.img_url?.trim() || (
            user.gender === "male" 
            ? 'images/male.jpg' 
            : user.gender === "female"
            ? 'images/female.png'
            : 'images/neutral.png');
        this.bio = user.bio || '';
        this.status = user.status || 'active';
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static validateUsername(username: string): boolean {
        return /^\w{1,15}$/.test(username);
    }
    
    static validatePassword(password: string): boolean {
        return /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
    }
    
}
