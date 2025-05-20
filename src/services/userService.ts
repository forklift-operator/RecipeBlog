import { ApiClient } from "./api-client";
import { UserModel } from "../models/userModel";
import type { IdType } from "../types/commonTypes";

export class UserService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }
    
    async login(username: string, password: string): Promise<UserModel | null> {
        const users = await this.apiClient.findAll(UserModel);
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (!foundUser) {
            throw new Error("Invalid credentials")
        }

        sessionStorage.setItem("activeUserId", foundUser.id.toString());
        return foundUser;
    }

    async register(user: UserModel): Promise<UserModel | null>{
        const users = await this.apiClient.findAll(UserModel);
        const foundUser = users.find(u => u.username === user.username);
        
        if (foundUser) {
            throw new Error("User with this username already exists");
        } 

        const newUser = await this.apiClient.create(UserModel, user);
        
        sessionStorage.setItem("activeUserId", newUser.id.toString());
        return newUser;
    }

    static getCurrentUser(): IdType | null {
        const id = sessionStorage.getItem("activeUserId");
        return id || null;
    }

    static logout(): void {
        sessionStorage.removeItem("activeUser");
    }

    static isAuthenticated(): boolean {
        return sessionStorage.getItem("activeUser") !== null;
    }

    async getUserById(id: IdType): Promise<UserModel> {
        return this.apiClient.findById(UserModel, id);
    }

    async getAllUsers(): Promise<UserModel[]> {
        return this.apiClient.findAll(UserModel);
    }

    async deleteUserById(id: IdType): Promise<UserModel|null> {
        return this.apiClient.deleteById(UserModel, id);
    }

    async updateUser(user: UserModel): Promise<UserModel> {
        return this.apiClient.update(UserModel, user);
    }
}