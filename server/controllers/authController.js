import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async(req, res) =>{
    
    try{
        const {email, password} = req.body.form
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success: false, message: 'user doesnot exist in the database'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(404).json({success: false, message: 'Password is not correct'})
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY, {expiresIn: '2d'})

        return res.status(200).json({success: true, token, user: {_id: user._id, role: user.role, name: user.name}})
    }catch(error){
        return res.status(404).json({success: false, message: 'Server error logging in'})
    }
}

export {login}