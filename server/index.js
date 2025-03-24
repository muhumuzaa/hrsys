import express from 'express'
import cors from 'cors'
import connectToDb from './db/db.js'

import authRouter from './routes/auth.js'


const app = express()
app.use(cors())

app.use(express.json())

connectToDb().then(() =>{
    console.log('Db is connected!')

    app.use('/api/auth', authRouter)

    app.listen(process.env.PORT, () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
        
    })
}).catch(err => {
    console.error('Db connection error: ', err)
})


