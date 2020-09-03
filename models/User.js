// mongoose 모듈을 가져와야 한다.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10; // salt의 글자수


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

userSchema.pre('save', function(next){
    var user = this; // userSchema를 가리킨다
    // 비밀번호 암호화시키기
    if(user.isModified('password')){ // 해당 요소가 변화되었을 때만 (실제로 비번이 바뀔 때만) 수행
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err); // save함수의 error 캐치로 보내버린다
            bcrypt.hash(user.password, salt, function(err, hash){ // 본래의 패스워드 - 솔트 - 콜백 함수를 넣어준다. hash는 암호화된 비밀번호
                if(err) return next(err);
                user.password = hash; // 암호화가 제대로 됐다면 기존 비밀번호와 바꿔주기
                next();
            }) 
        })
    } else {
        next(); // 다른 걸 바꿀 때는 그냥 바로 next로!
    }

});

// 비밀번호 비교
userSchema.methods.comparePassword = function(plainPW, callback){
    bcrypt.compare(plainPW, this.password, function(err, isMatch){
        if(err) return callback(err);
        return callback(null, isMatch);
    });
}

// 토큰 생성
userSchema.methods.generateToken(cb){

    var user = this;
    // jsonwebtoken 이용해 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken'); // _id는 몽고에서 기본으로 하나씩 생성되는 _id를 말함
    
    user.token = token;
    user.save(function(err, userInfo) {
        if(err) return cb(err);
        return cb(null, userInfo);
    });
}

const User = mongoose.model('User', userSchema)
module.exports = {User}; // 다른 파일에서도 해당 모듈을 쓸 수 있게