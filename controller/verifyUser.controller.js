const { asyncWrap } = require("../utils/asyncWrap");
const User = require("../models/User");

module.exports.verify = asyncWrap(async (req, res) => {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Unauthorized user",
        });
    }

    res.status(200).json({
        success: true,
        user,
    });
});