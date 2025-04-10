const { MongoClient } = require('mongodb');


//Mongo Db Connection
const client=new MongoClient('mongodb://localhost:27017');
let db;

const connectDB=async()=>{
    try{ 
        await client.connect();
        console.log('MongoDb connected');
        db=client.db("e-commerce");
        return db;
    }
    catch(err){
        console.error("MongoDb connection error",err);
    }
}


module.exports={connectDB}