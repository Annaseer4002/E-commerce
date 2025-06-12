const jwt = require('jsonwebtoken');
const AuthModel = require('../models/AuthModel');



const SignUp = async (req, res)=>{


    // execute the following code and see
    try {
       
        const {email, password, userName} = req.body;

    if(!email){
        return res.status(400).json({message: "please enter your email"})
    }

    if(!password){
        return res.status(400).json({message: "please enter your password"})
    }

    if(!userName){
        return res.status(400).json({message: "please enter your username"})
    }

    if(password < 6){
        return res.status(400).json({message: "Password must be minimum of 6 characters"})
    }


    
    // check if the user already exist
    const existingUserByEmail = await AuthModel.findOne({email})

    if(existingUserByEmail){
        return res.status(400).json({message:'User account already exist'})
    }

   // hashing the password to be secured
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new AuthModel ({
        email,
        password: hashedPassword,
        userName
    })

    await newUser.save()

    res.status(201).json({
        message: "user account created Successfully",
        newUser: {
            email,
            userName
        }
    })


    }
    // if any server error return it automatically instead of crashing
    catch(error){
return res.status(500).json({error})
    }
    

}

const login = async (req, res)=>{
    
    try {
        const {email, password} = req.body

    const user = await AuthModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:'User account those not exist'
        })
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    if(!isMatch){
        return res.status(400).json({message:'Incorrect email or password'})
    }

    //Access token
    const accessToken = jwt.sign(
        { user},
        process.env.JWT_SECRET, 
        { expiresIn: '5m' }
    );

    const refreshToken = jwt.sign(
        { user},
        process.env.REFRESH_TOKEN,
        { expiresIn: '1d' }
    );

    res.status(200).json({
        message:'Login Successfully',
        accessToken,
        refreshToken,
        user: {
            email: user?.email,
            userName: user?.userName
        }
        
    })

    } catch (error) {
        return res.status(500).json({error: error.message})
        
    }

}


module.exports = {
    SignUp, login
}
