import { Schema, model } from 'mongoose';

const registrationSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event is required'],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required'],
    }
});

export default model('registration', registrationSchema);