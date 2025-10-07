import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", 
  });
};

// Route for user login
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        // check if user exists
        const user = await userModel.findOne({ email});
        if(!user){
            return res.json({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id);
            res.json({ success: true, token });
        }else{
            return res.json({ message: "Incorrect password", success: false });
        }

    }catch(error){
        console.log(error);
        res.json({ message: error.message, success: false });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user already exists
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.json({ message: "User already exists", success: false });
    }

    // validate email format & password strength

    if (!validator.isEmail(email)) {
      return res.json({
        message: "Please enter a valid email",
        success: false,
      });
    }

    // if(!validator.isStrongPassword(password)){
    //     return res.json({ message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.", success: false });
    // }

    if (password.length < 8) {
      return res.json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
  // Logic for logging in an admin
};

export { loginUser, registerUser, adminLogin };
