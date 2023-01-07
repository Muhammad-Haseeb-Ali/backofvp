const mongoose = require("mongoose")

const propSchema = new mongoose.Schema({
    id:Number,
    client:{
        type:String,
        default: 'you'
    },
    discription:{
        type:String,
        require:true
    },
    faceLink:{
        type:String,
        require:true
    },
    screenLink:{
        type:String,
        require:true
    },
    publish:{
        type: Boolean,
        default: true,
        require: true
    }
})
    const Proposal =  mongoose.model('Proposal', propSchema)

exports.Proposal = Proposal;