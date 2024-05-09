
const UserModel = require('../Models/UserModel');
const SellerModal = require('../Models/SellerModel');
const sellerModal = require('../Models/SellerModel');

const sendOtp = async (req, res) => {
    try{
        const {UEmail, UName} = req.body;

        const useralready = await UserModel.findOne({UEmail: UEmail});
        if(useralready) {
            return res.status(500).json({message: 'User already exists'});
        }

        const {sendMail, GetOtp} = require('../Models/EmailSender');

        const otp = GetOtp();
        const msg = `hello ${UName} you have registered in EcoS's. Your secret code is ${otp}`;

        sendMail("EcoS's Registration", msg, UEmail);
        
        res.status(200).json({message: 'email sent successfully', otp : otp.toString()});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const signup = async (req, res) => {
    try{
        const {userData} = req.body;
        console.log(userData)

        const newUserData = await UserModel.create(userData);
        if(newUserData) {
            return res.status(200).json({message: 'signup successful', newUserData});
        }
        
        res.status(200).json({message: 'email sent successfully', otp : otp.toString(), userData});
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

const sendRequestToSeller = async (req, res) => {
    try {
        const {sellerData} = (req.body)
        const newSellerData = await SellerModal.create(sellerData);
        if(newSellerData) {
            return res.status(200).json({message:'Now You can Login as Seller', newSellerData});
        }
        res.status(400).json({message: 'Internal Server Error'});
    }
    catch(e) {
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const sellerStatus = async (req, res) => {
    try {
        const { UId } = req.body; // Destructuring to get UId from req.body
        const sellerData = await sellerModal.findOne({ UId: UId }); // Using UId to find sellerData
        if (sellerData) {
            return res.status(200).json({ message: 'Seller found' });
        }
        res.status(404).json({ message: 'Seller not found' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    sendOtp, login, signup, sendRequestToSeller,sellerStatus
}