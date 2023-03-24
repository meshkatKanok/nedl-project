const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.port || 5000;
require('dotenv').config()
app.use(cors({origin:'*'}))
app.use(express.json())




app.get('/', (req, res) => {
    res.send("ndl server running")
})
const uri = `mongodb+srv://${process.env.Nedl_user}:${process.env.Nedl_pass}@cluster0.khjyu2b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const nedlData = client.db('coursedata').collection("courses")
        

        app.get('/course', async (req, res) => {
            const query = {}
            const cursor = nedlData.find(query).sort("_id")
            const courses = await cursor.toArray()
            res.send(courses)

        }) 
        
        app.get('/course/:id',async(req,res)=>{
            const id=req.params.id
            console.log(id);
            const query={ _id: new ObjectId(id)}
            const coursedetais=await nedlData.findOne(query)
            console.log(coursedetais);
            res.send(coursedetais)
        })
       
    }
    finally {

    }
}


run().catch(console.dir)


app.listen(port, () => {
    console.log(`ndl server port ${port}`);
})