
import { Console } from 'console';
import {MongoClient,Db,ObjectId}  from 'mongodb'


const uri = 'mongodb+srv://new:123@cluster0.3euieop.mongodb.net/'; 
const dbName = 'TODO'; 

const collectionName = 'TODO items'; 

async function connectToDatabase(): Promise<Db> {
    try {
        const client = await MongoClient.connect(uri);
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}



export async function addDocument(document:object){

    try{
        const db = await connectToDatabase()
        const result = await db.collection(collectionName).insertOne(document);
        console.log(result.acknowledged)
        return result.acknowledged;
    }
catch (error){
    console.error('Error adding document:', error);
    throw error;
}

}

export async function FetchDocument(){
    try {
        const db = await connectToDatabase();

        const documents = await db.collection(collectionName).find().toArray();
        console.log(documents)
        return documents;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
}

export async function UpdateDocument(id:string,document:object){

    try{
        const db = await connectToDatabase();
        const result =await db.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $set: document }, { upsert: false });
        console.log("upsertedCount",result.upsertedCount)
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
    
}

export async function deleteDocument(id:string){

    try{
        const db = await connectToDatabase();
        const result =  await db.collection(collectionName).deleteOne({"_id": new ObjectId(id) });
        console.log("deletedCount",result.deletedCount);
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
    
}

