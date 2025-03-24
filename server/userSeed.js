import connectToDb from "./db/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt'

const userRegister = async () =>{
    connectToDb()
    try{
        const hashedpwd = await bcrypt.hash('admin', 10)
        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: hashedpwd,
            role: 'admin'
        })
        await newUser.save()
    }catch(error){
        console.log(error);
        
    }
}

userRegister();