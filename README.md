
# UrlShortenedApp
URL Shortner App
#Project Installation

Front End Requirements (Angularjs):
  Kindly check 'bower.json' in 'urlApp/web'to install Required dependencies for front end.
  UI MainFile:
    Url/App/web/index.html

BackEnd Requirement (Nodejs):
  Kindly check 'package.json'  in 'urlApp' to install dependencies.

Db mongodb (robomongo):
   Server Making a connection at localhost port 27017 options user:'admin',pwd:'123' databaseName:URl

Server MainFile(starting point):
    After Installation is completed. Run 'url.js' in UrlApp/ which will listen on localhost:8082


# Requirements Acheived
Front End UI:
  Input Form with help of recaptcha Verification .
  Angular Ui tabSet to show the details of shorted Url like Iframe and Analytic.
  Interactive  Gui using the angular built in directives .

BackEnd:
  Created End Point
       to get Url request and analytics using goo.gi(Developer API Key) module which uses google api.  
       to verify the recaptcha Input.
       to get data from the database
# Decisions Taken

 Goo.go (module for UrlShortening):
   Found this module to be more effective as looking at its functionality and Number of daily users

 Persistent Storage:
   To evaluate the Analytic we need to store all data.Mongodb ,a dynamic, fast and json formate storage closely attached to nodejs.

 ReCAPTCHA for Spam :
    A secret key used for the verification at the back end and Its dynamic changes of the images and the decisions for each step make it difficult to break.
 Dash Board :
   A more graphical Dash Board is not shown rather than all the analytical data is shown in the table against each url.And clicking the url opens up the windows for the google graphical analysis.

# Limitations

OAuth 2.0 implementation for private and unique Urls:
  Created the Credentials for the client Id and secret Key .
  But Still looking for Api or module that how it will work for private connections.
Expiration period for Url:
  Same issue as the above still looking for it that just need to take more time to reach to a logical decision.
