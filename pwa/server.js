const express = require('express');
const app = express()
const fs = require('fs');
let json = []

for (let i = 0; i < 50; i++) {
  json.push(`https://www.fullstackjavascript.cn/conan/${i}.jpeg`)
}

fs.writeFileSync('data.json',JSON.stringify(json))

app.use(express.static(__dirname))

app.get('/api/img',(req, res) => {
  let starts = Math.round(Math.random() * (json.length - 20))
  res.json(json.slice(starts, starts+20))
})

app.listen(3000, () => {
  console.log('your server is running 3000 port')
})
