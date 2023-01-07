// mongodb+srv://admin:<password>@proposals.wmemj9c.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose")

exports.connect = async ()=>{
    await mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@proposals.wmemj9c.mongodb.net/?retryWrites=true&w=majority`)
    console.log("Hurry! Database is Connected Successfully.")
}