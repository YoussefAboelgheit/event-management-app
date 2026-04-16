import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Event title must be at least 5 characters'],
        maxlength: [100, 'Event title must be at most 100 characters'],
        required: [true, 'Event title is required'],
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
    },
    capacityLimit: {
        type: Number,
        min: [1, 'Capacity limit must be at least 1'],
        required: [true, 'Capacity limit is required'],
    },
    description: {
        type: String,
        maxlength: [400, 'Event description must be at most 400 characters'],
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Category is required'],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required'],
    }
});

export default model('Event', eventSchema);