const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true, // Ensure userId is unique
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);
