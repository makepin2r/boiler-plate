const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // body parser가 application/x-www-form-urlencoded 타입 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.json()); // application/json 타입 데이터 분석해서 가져올 수 있게 함

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
app.post('/register', (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

