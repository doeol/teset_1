var express        = require("express");
var mongoose       = require("mongoose");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var flash          = require("connect-flash");
var session        = require("express-session");
var passport       = require("./config/passport");
var app = express();

// DB setting
//mongoose.connect('mongodb://localhost/story');
//var url = 'mongodb://localhost/test';
var url = process.env.MONGOLAB_URI;
mongoose.connect(url);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected");
});
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret"}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

// Routes
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/users"));
app.use("/users/:username/projects", require("./routes/projects"));
app.use("/users/:username/projects/:id/characters", require("./routes/characters"));
app.use("/users/:username/projects/:id/plot", require("./routes/plot"));
app.use("/users/:username/projects/:id/matrix", require("./routes/matrix"));


// Port setting
var port = process.env.PORT||3000;
app.listen(port, function(){
  console.log("server on!");
});
