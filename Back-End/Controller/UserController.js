
const UserModel = require('../Models/UserModel');

const signup = async (req, res) => {
    try{
        const userData = req.body;
        // console.log(userData)

        const useralready = await UserModel.findOne({UEmail: userData.UEmail});
        if(useralready) {
            return res.status(500).json({message: 'User already exists'});
        }

        const newUserData = await UserModel.create(userData);
        if(newUserData) {
            return res.status(200).json({message: 'signup successful', newUserData});
        }
        
        res.status(400).json({message: 'Internal Server Error'});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await UserModel.findOne({UEmail: email});
        
        if(user) {
            if(password === user.UPassword) {
                return res.status(200).json({message: 'login successful', user: user});
            }
            else {
                return res.status(400).json({message: 'Invalid Credentials'});
            }
        }

        res.status(400).json({message: 'Invalid User'});
        
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

module.exports = {
    signup, login
}