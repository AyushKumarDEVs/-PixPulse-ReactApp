import { Client, Databases, ID, Query, Storage } from 'appwrite';
import React from 'react'
import { ConfigureEV } from '../configure ev/ConfigureEV';
import { useNavigate } from 'react-router-dom';

class userservices{
    client;
    database;
    storage;
    constructor(){
        this.client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject(ConfigureEV.APPWRITE_PROJECT_ID);
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client);
    }

    async CreateProfile({username,profilephoto,email,followers,userid}){
        try {
            return await this.database.createDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_ProfileCOLLECTION_ID,userid,
                {
                    profilephoto,
                    username,
                    email,
                    followers,
                }
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    async UpdateProfile({username,profilephoto,followers,email,userid}){
        try {
            return await this.database.updateDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_ProfileCOLLECTION_ID,userid,
                {
                    profilephoto,
                    username,
                    email,
                    followers,
                   
                }
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }


    
    async CreateFollower({followerid,followingid}){
        try {
            return await this.database.createDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_FollowersCOLLECTION_ID,ID.unique(),
                {
                    followerid,
                    followingid,

                }
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    async DeleteFollower(documenid){
        try {
            return await this.database.deleteDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_FollowersCOLLECTION_ID,documenid,
              
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }
    async listAllFollowers(followingid){
        try {
            return await this.database.listDocuments(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_FollowersCOLLECTION_ID,
                [Query.equal("followingid", followingid)],
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    async listAllFollowing(followerid){
        try {
            return await this.database.listDocuments(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_FollowersCOLLECTION_ID,
                [Query.equal("followerid", followerid)],
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    async CheckforFollowing(followingid,followerid){
        try {
            return await this.database.listDocuments(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_FollowersCOLLECTION_ID,
                [
                    Query.and([
                        Query.equal('followingid', followingid),
                        Query.equal('followerid', followerid)
                    ])
                ]                
                
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }




    async getProfile(userid){
        try {
            return await this.database.getDocument(ConfigureEV.APPWRITE_DATABASE_ID,ConfigureEV.APPWRITE_ProfileCOLLECTION_ID,userid,
               
            )
        } catch (error) {
            console.log("error"+error);
        }
        
    }


    async CreateProfilePhoto(file){
        try {
            return await this.storage.createFile(ConfigureEV.APPWRITE_profileBUCKET_ID,ID.unique(),file);
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    async DeleteProfilePhoto(fileid){
        try {
            return await this.storage.deleteFile(ConfigureEV.APPWRITE_profileBUCKET_ID,fileid);
        } catch (error) {
            console.log("error"+error);
        }
        
    }

    PreviewProfilePhoto(fileid){
        try {
            return this.storage.getFilePreview(ConfigureEV.APPWRITE_profileBUCKET_ID,fileid);
        } catch (error) {
            console.log("error"+error);
        }
        
    }




}
const UserServices=new userservices();

export default UserServices