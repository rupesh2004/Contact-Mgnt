import client from "../../../../lib/mongodb";

export async  function  GET(req,res){
    try {
        await client.connect();
        const db = await client.db("savedContacts");

        const allContacts = await db.collection("contacts").find().toArray();
        if(allContacts === 0){
            return Response.json({error:"No contacts found."});
        }
        return Response.json(
            {allContacts: allContacts},
            {status : 200},
        );
    }catch (err){
        console.log(err);
    }
}