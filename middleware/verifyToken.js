const jwt = require("jsonwebtoken");
const { asyncWrap } = require("../utils/asyncWrap")

module.exports.verifyToken = asyncWrap(async (req, res, next) => {

    const token = req.cookies.token;

    if (token) {

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decode.id;
            return next();
        } catch (e) {
            console.log("Unauthorized", e);
        }

    }



})