import { Client, Account, ID } from "appwrite";
import {ConfigureEV} from "../configure ev/ConfigureEV";
export class AuthService{
    client = new Client()
    
    account;
    constructor(){
        this.client
        .setEndpoint(ConfigureEV.APPWRITE_ENDPOINT) // Your API Endpoint
        .setProject(ConfigureEV.APPWRITE_PROJECT_ID);   

        this.account=new Account(this.client);
    }

    async CreateAccount({username,password,email}){
        try {
            return await this.account.create(ID.unique(),email,password,username);
           

        } catch (error) {
            throw error;
        }
    }

    async Login({password,email}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;

        }
    }

    async GetCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("error is yo "+error)
            

        }
        return null;
    }

    async Logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout error : " +error);

        }
        return null;
    }


}

const authservice=new AuthService();

export default authservice;

