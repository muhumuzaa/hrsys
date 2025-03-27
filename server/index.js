import express from 'express'
import cors from 'cors'
import connectToDb from './db/db.js'

import authRouter from './routes/auth.js'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()


app.use(cors())

app.use(express.json())

connectToDb().then(() =>{
    console.log('Db is connected!')

    //serve static files
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.use('/api/auth', authRouter)

    //if no API routes match, send back index.html
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
    })
    const PORT = process.env.PORT || 3001
    app.listen( PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
        
    })
}).catch(err => {
    console.error('Db connection error: ', err)
})


