// mongoose 모듈을 가져와야 한다.
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 사이 공백을 없애주는 역할
        unique: 1 // 유일하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    role: { // admin or not
        type: Number,
        default: 0
    },
    image: String,
    token: { // for validation check
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = {User}; // 다른 파일에서도 해당 모듈을 쓸 수 있게