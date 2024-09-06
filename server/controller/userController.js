const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async(req, res) => {
        try{
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email });
            if(user) return res.status(401).json({ msg: "user already exists" });

            if(password.length < 6) return res.status(401).json({ msg: "password should be at least 6 character long" });

            // hashing password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new Users({
                name, email, password: hashedPassword
            });
            // save mongodb
            await newUser.save();

            // create jwt token for authentication
            const accessToken = createAccessToken({id: newUser._id});
            const refreshtoken = createRefreshToken({id: newUser._id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path:'/user/refresh_token'
            })

            res.json(accessToken);

        }catch(err){
            console.log(err);
            
            return res.status(500).json({ message: err.message });
        }
    },
    refreshtoken: async(req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"please login or register"});
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "please login or register"});
                const accesstoken = createAccessToken({id:user.id});
                res.json({user, accesstoken});
            })
        }catch(err){
            return res.status(500).json({ message: err.message });
        }
       
    },
    login: async(req, res) => {
        try{
            const { email, password } = req.body;

            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg: "User or password does not exists"});
            
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({msg: "user or password doesn't exists"});

            const accessToken = createAccessToken({id: user._id});
            const refreshtoken = createRefreshToken({id: user._id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path:'/user/refresh_token'
            })

            res.json({msg: "Login Sucesfull", accessToken})
        }catch(err){
            return res.status(500).json({message: err.message});
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'});
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'});
}

module.exports = userController