const app = require('express')();

app.get('/getUser',(req, res) => {
  res.json({name: 'Jonny'})
})

app.listen(3001)