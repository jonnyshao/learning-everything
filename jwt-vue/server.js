const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const jwt = require('jsonwebtoken')
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method.toLowerCase() === 'options') {
    return res.end()
  } else {
    next();
  }

});
app.use(bodyParser.json())
let secret = "Jonny"
// cookie token (json web token)
app.post('/user', (req, res) => {
  let {username} = req.body;
  if (username !== undefined && !username) {
    res.json({
      code: 1,
      msg: '缺少 username参数'
    })
  }
  console.log('username~~~~~' ,username);
  if (username === 'admin') {
    res.json({code: 0,username: 'admin', token: jwt.sign({username: 'admin'}, secret, {expiresIn: 20})})
  } else {
    res.json({
      code: 1,
      msg: '用户名不存在'
    })
  }
})

app.get('/validate', (req, res) => {
  let token = req.headers.authorization
  jwt.verify(token, secret, (err, decode) => { // decode => {username: 'admin'}
    if (err) {
      return res.json({code: 1, msg: 'token失效了'})
    } else { // 淘宝 登录后30分钟之后不做任何操作 自动退出 需要把token的失效的延长
      res.json({code: 0, username: decode.username, token: jwt.sign({username: 'admin'}, secret, {expiresIn: 20})})
    }
  })
})

app.listen(3000, () => {
  console.log('your server is running 3000')
});
