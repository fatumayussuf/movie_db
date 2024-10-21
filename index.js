import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";


let app=express();
let port=2000;
let uri=`mongodb+srv://fatumayussuf:${process.env.MONGODB_PASSWORD}@cluster0.r1xw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 let  client=new MongoClient(uri);


 app.get("/", async (req,res) =>{
    console.log(process.env.MONGODB_PASSWORD);
    try{
        let db =client.db('sample_mflix');
        let collection = db.collection('movies');

        let movies = await collection.find({year:{$gte:2000},"imdb.rating":{ $gte:8.5 }, rated:"G"}, {limit:20}).toArray();

        let theatersCollection=db.collection("theaters");
        let theaters = await theatersCollection.find({"location.address.zipcode": "92691"}).limit(20).toArray();

return res.json(theaters);

    }catch (error){
        console.error(error);
    }finally{
        await client.close();
        
    }
    res.send("OK");

});



app.listen(port,()=>console.log(`server started on port${port}`));