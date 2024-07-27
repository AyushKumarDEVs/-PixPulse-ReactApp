import { Client, Account, ID,Databases,Storage, Query} from "appwrite";
import {ConfigureEV} from "../configure ev/ConfigureEV";



export class DatabasesService{
    client = new Client()
    Databases;
    Storage;

    constructor(){
        this.client
        .setEndpoint(ConfigureEV.APPWRITE_ENDPOINT) // Your API Endpoint
        .setProject(ConfigureEV.APPWRITE_PROJECT_ID);   

        this.Databases=new Databases(this.client);
        this.Storage=new Storage(this.client);

    }

    async CreatePost({title,slug,content,articleimage,status,userid}){//slug is nothing but document id so that if need to update the document we have that document id
        try {
            return await this.Databases.createDocument(
                ConfigureEV.APPWRITE_DATABASE_ID,
                ConfigureEV.APPWRITE_COLLECTION_ID,
                slug,
                {title,content,articleimage,status,userid,},
            )
        } catch (error) {
            throw error;
        }
    }

    async UpdatePost({title,slug,content,articleimage,status,userid}){
        try {
            return await this.Databases.updateDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_COLLECTION_ID,slug,{
                title,content,articleimage,status,userid,
            })
        } catch (error) {
            throw error;
        }
    }

    async DeletePost(slug){
        try {
            return await this.Databases.deleteDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_COLLECTION_ID,slug)
        } catch (error) {
            console.log("error"+error)
        }
    }

    async GetPost(slug){
        try {
            return await this.Databases.getDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_COLLECTION_ID,slug)
        } catch (error) {
            console.log(error) ;
        }
    }

    async getPosts(querryactive){
        
        try {
            if(!querryactive){
                return await this.Databases.listDocuments(
                    ConfigureEV.APPWRITE_DATABASE_ID,
                    ConfigureEV.APPWRITE_COLLECTION_ID,
                    
                )
            }else
            return await this.Databases.listDocuments(
                ConfigureEV.APPWRITE_DATABASE_ID,
                ConfigureEV.APPWRITE_COLLECTION_ID,
                
                [Query.equal("status", "active")],
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async getuserpost(userid){
        
        try {
            
            return await this.Databases.listDocuments(
                ConfigureEV.APPWRITE_DATABASE_ID,
                ConfigureEV.APPWRITE_COLLECTION_ID,
                
                [Query.equal("userid", userid)],
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    
    async CreateFile(files){
        try {
            return await this.Storage.createFile(ConfigureEV.APPWRITE_BUCKET_ID,ID.unique(),files)
        } catch (error) {
            console.log("create file error"+error)
            return false;
        }
    }

    async DeleteFile(fileID){
        try {
            return await this.Storage.deleteFile(ConfigureEV.APPWRITE_BUCKET_ID,fileID)
        } catch (error) {
            throw error;
        }
    }

    PreviewFile(articleimage){
        try {
            return  this.Storage.getFilePreview(ConfigureEV.APPWRITE_BUCKET_ID,articleimage);
        } catch (error) {
             console.log("preview file error :" +error);
        }
    }
}

const DatabasesServices=new DatabasesService();
export default DatabasesServices;

