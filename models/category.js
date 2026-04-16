import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'Category name must be at least 3 characters'],
        maxlength: [50, 'Category name must be at most 50 characters'],
        required: [true, 'Category name is required'],
    }
})

export default model('category', categorySchema);