const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chatmate");
        console.log("mongodb connected!");


    } catch (e) {
        console.log(e);
    }
}

module.exports = connectDb;