const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ADMIN_ROLE, CUSTOMER_ROLE } = require('../commons/util');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /.{4,}/ // so that username is not shorter than 4
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true, // non-nullable
        enum: [CUSTOMER_ROLE, ADMIN_ROLE],
        default: CUSTOMER_ROLE
    }
}, { collection: 'users' });

schema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(this.password, salt);
    }

    next();
})

module.exports = mongoose.model('User', schema);