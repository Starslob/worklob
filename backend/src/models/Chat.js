const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true },  
    jobType: { 
        type: String, 
        enum: ['FullTimeJob', 'FreelanceJob', 'GigJob'], 
        required: true 
    },  
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },  
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Later when querying, you can dynamically populate based on `jobType`
const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
