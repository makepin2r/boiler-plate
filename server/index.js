const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');
const {User} = require("./models/User");

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // body parser가 application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.json()); // application/json 타입 데이터 분석해서 가져올 수 있게 함

app.use(cookieParser()); // cookie-parser 사용

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


// route
app.get('/', (req, res) => {
  res.send('Hello World! sdfsdfsdf')
})

app.post('/api/users/register', (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })// mongoDB의 메서드. 정보들을 user 모델에 저장하게 해준다
})

app.post('/api/users/login', (req, res)=> {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다. MongoDB의 findOne() 메서드를 활용한다.
  User.findOne({email: req.body.email}, (err, userInfo) => {
    if(!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  // 요청한 이메일이 있다면 비번이 같은지 확인한다.
  // comparePassword는 user model에서 만들어둔다 멤버함수처럼!
  userInfo.comparePassword(req.body.password, (err, isMatch) => {
    if(err) {
      return res.json({
        loginSuccess: false, 
        message: "비밀번호가 틀렸습니다."
      });
    } 
    // 비번까지 같다면 Token 생성
    userInfo.generateToken((err, userInfo) => {
      if(err) return res.status(400).send(err);
      // 토큰을 쿠키나 로컬스토리지 등등에 저장한다. 여기선 쿠키
      res.cookie("x_auth", userInfo.token).status(200).json({loginSuccess: true, userId : userInfo._id});
    })
  })
  })
})

// auth는 미들웨어
app.get('/api/users/auth', auth, (req, res) => {
  // authentication이 true가 된 상태로 통과된 것
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false: true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
})

// logout
app.get('/api/users/logout', auth, (req, res)=> {
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""}, // delete token
    (err, user)=> {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    }
    )
});

// react routing 
app.get('/api/hello', (req, res) => {
  // 프론트엔드에 응답
  res.send("안냥하세요");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

