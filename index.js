const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://tech-store:${process.env.DB_PASS}@cluster0.sk1ew0y.mongodb.net/?appName=cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // await client.connect();
        const usersCollection = client.db("techStore").collection("users")
        const productsCollection = client.db("techStore").collection("products")
        const reviewsCollection = client.db("techStore").collection("reviews")

        app.get('/users', async (req, res) => {
            const result =await usersCollection.find.toArray();
            res.send(result)
        })
        app.post('users',async (req,res)=>{
            const user= req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
        






        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);











app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})