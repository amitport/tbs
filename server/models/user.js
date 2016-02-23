import './init';

import mongoose from 'mongoose';
import validators from 'mongoose-validators';
import uniqueValidator from 'mongoose-beautiful-unique-validation';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: validators.isEmail(),
        index: {unique: true, sparse: true}
    },
    avatarImageUrl: {
        type: String,
        validate: validators.isURL()
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    google: {
        type: String,
        index: {unique: true, sparse: true}
    }
});
UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);
