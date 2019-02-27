let express = require('express')
let app = express()
let path = require('path')
app.get('/',function (req, res) {
  res.sendFile(path.join(__dirname,'2.html'))
})

app.get('/user/:id', function (req, res) {
  let id = req.params.id;
  res.json({
    id,
    name:'Ryan'+id
  })
})

app.listen(3000)