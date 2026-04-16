import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        minlength: [2, 'User name must be at least 2 characters'],
        maxlength: [100, 'User name must be at most 100 characters'],
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters'],
        required: [true, 'Password is required'],
    }
});

export default model('user', userSchema);