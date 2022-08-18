import { auth } from "./middlewares/auth.js";
import { connectDB } from "./db/index.js";
import express from "express";
import {graphqlHTTP} from 'express-graphql'
import { schema } from "./graphql/schema.js";

connectDB()
const app = express()
app.use(auth)
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))
app.get('/', (req, res, next) => {
    res.send('WELCOME')
})
app.listen(3000)