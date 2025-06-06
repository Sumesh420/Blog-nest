import {Client,Databases,Storage,Query, ID} from "appwrite"
import conf from "../config/conf.js"

class BucketService{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            )
        } catch (error) {
            throw new Error(`Problem in appwrite :: createPost method - ${error}`)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {title,content,featuredImage,status}
            )
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: updatePost method - ${error}`)
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: deletePost method - ${error}`)
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
          const err=  new Error(`Problem occured in appwrite :: getPost method - ${error}`)
          err.original=error;
          throw err;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: getPosts method - ${error}`)
        }
    }
    // file upload service

    async uploadFile(file){
        try {
           return  await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: uploadFile method - ${error}`)
           
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: deleteFile method - ${error}`)
            
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        ).toString()
    };
    async getFileDownloadUrl(fileId){
        try {
            return await this.bucket.getFileDownloadUrl(
                conf.appWriteBucketId,
                fileId
            )
        } catch (error) {
            throw new Error(`Problem occured in appwrite :: getFileDownloadURL method - ${error}`)
            
        }
    }
}
const bucketService=new BucketService();
export default bucketService;