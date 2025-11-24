
import dotenv from "dotenv";

dotenv.config();
import { app } from './app.js';
import connectDB from './db/db.js';
const port = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log("Database connection failed.");

    })
app.get('/', (req, res) => {
    res.send('Hello World!')
})


