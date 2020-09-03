// 환경 변수로 개발 환경 분기를 나눌 수 있음
if(process.env.NODE_ENV === 'production') // production: deploy 후
{
    module.exports = require('./prod');
} else { // development: local
    module.exports = require('./dev');
}