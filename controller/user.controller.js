const { asyncWrap } = require("../utils/asyncWrap");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
module.exports.signup = asyncWrap(async (req, res) => {

    const { email, password } = req.body;
    const isExist = await User.findOne({ email });

    if (isExist) {
        return res.status(401).json({ message: "User already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000

    })
    newUser.password = undefined;
    res.status(201).json({ message: "Signup Successfully!", user: newUser });

})
module.exports.login = asyncWrap(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "User not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(501).json({ message: "invalid creadentials" });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000

    })

    user.password = undefined;
    res.status(201).json({ message: "login Successfully!", user: user });

})

module.exports.logout = asyncWrap(async(req,res)=>{

    res.clearCookie("token",{
        httpOnly:true,
        sameSite:process.env.NODE_ENV === "production",
        secure:"lax",
        
    })

    res.status(200).json({message:"Logout Succesfully",success:true})
})
