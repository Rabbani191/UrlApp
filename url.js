
var express = require('express');
var bodyParser = require('body-parser');
var googl = require('goo.gl');
var underscore= require('underscore');
var mongoose = require('mongoose');
var request = require('request');
var app = express();

app.use('/',express.static('web'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var db = "mongodb://" + "127.0.0.1"+ ":" + "27017 " + "/" + "URL";
var options = {  user: 'admin',  pwd: '123'}
var connectionObj = mongoose.connect (db, options);
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + db);
});

var Schema =mongoose.Schema;
var urlSchema= new Schema({
  orginal:{type :String},
  short:{type:String},
  country:{type :String},
  click:{type:Number},
  timeCreated: {type:String},
});

var Urls=mongoose.model('Url',urlSchema);

googl.setKey('AIzaSyBHCGZu9uoSqIo4O1YqW9eHZwN2S5c4ioE');

app.post('/checkReboot',function(req,res){
  console.log(req.body.recaptcha);
  // if its blank or null means user has not selected the captcha, so return the error.
 if(req.body.recaptcha === undefined || req.body.recaptcha === '' || req.body.recaptcha === null) {
   return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
 }
 console.log();
 // Put your secret key here.
 var secretKey = "6LcFgyYUAAAAAOLSa4QZeoue7b31GnJB1OfrI9JI";
 // req.connection.remoteAddress will provide IP address of connected user.
 var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha + "&remoteip=" + req.connection.remoteAddress;
 // Hitting GET request to the URL, Google will respond with success or error scenario.
 request(verificationUrl,function(error,response,body) {
   body = JSON.parse(body);
   // Success will be true or false depending upon captcha validation.
   if(body.success !== undefined && !body.success) {
     return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
   }
   res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
 });

});

app.post('/getUrl', function (req, res) {

  googl.shorten(req.body.OrUrl)
   .then(function (shortUrl) {
     googl.analytics(shortUrl)
       .then(function(result) {
         saveUrl(req.body.OrUrl,shortUrl,result);
         console.log(result);
         res.send({'data':result,'shortUrl':shortUrl});
       })
       .catch(function (err) {
           console.error(err.message);
       });
    //  res.send({'ChUrl':shortUrl});
    },function (erro) {
     console.log(err);
    })

});

var saveUrl= function(original, shortUrl, result){

  var array=underscore._.mapObject(result.day.countries, function(it) {
  return it.id;
   });

  var newUrl = new Urls({
    orginal:original,
    short:shortUrl,
    country:underscore._.values(array),
    click:result.day.shortUrlClicks,
    timeCreated:new Date()
   });
   newUrl.save(function(err, data){
     if(err){
       console.log (err);
     }
     else{
       console.log ('success');
     }
   });


}

app.get('/getUrlData', function (req, res) {
  console.log ('here');
   Urls.find(function(err, urls) {
     if (err){
       console.log (err)
       res.send(err);
       }
     else {
     res.json(urls);
    }
   });
});


app.listen(8082,function(){
console.log("server is listening at port 8082");
});
