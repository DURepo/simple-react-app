const express = require('express')
const cors = require('cors')
const axios= require('axios')
const mysql = require('mysql')

const app = express()

app.use(cors())

const connection = mysql.createConnection({
  host:'lolyz0ok3stvj6f0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user:'yvawm7c4pfodpjsv',
  password:'yv3cxxnhbd74m1j1',
  database: 'wvygw1nw57w9uwdm'
  });

  app.get('/users', function(req,res){
    connection.query('SELECT * from new_table', function(err, data){
             (err)?res.send(err):res.json({users:data})
         })
  })

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))

    app.get('*', (req, res) =>{ 
        res.sendFile(path.resolve(__dirname, "client", "build","index.html"))
    })
}

app.get('/', (req, res) => {
    res.send("Hello")
})

const PORT = process.env.PORT ||  4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

