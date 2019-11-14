var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const connection = mysql.createConnection({
//   host:'lolyz0ok3stvj6f0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   user:'yvawm7c4pfodpjsv',
//   password:'yv3cxxnhbd74m1j1',
//   database: 'wvygw1nw57w9uwdm'
//   });

  const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'kec123!',
    database: 'sample-react-sql-db'
    });

connection.connect(function(err){
  (err)? console.log(err+'+++++++++++++++//////////'): console.log('connection********');
  });

require('./routes/html-routes')(app, connection);


if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'))

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,"client", "build", "index.html"))
  })
}


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



//app.use('/', indexRouter);
app.get('/users', function(req,res){
  connection.query('SELECT * from new_table', function(err, data){
           (err)?res.send(err):res.json({users:data})
       })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT ||  4000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

//module.exports = app;
