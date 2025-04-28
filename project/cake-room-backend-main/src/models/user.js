import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    role: {type: String, default: 'user'}
})

const User = model('User', UserSchema);

export default User;