import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true 
    },
    timings: {
        type: [ String ],
        required: true
    }
})

export const Doctor = mongoose.model('Doctor', doctorSchema)