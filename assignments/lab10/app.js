// Setup server, session and middleware here.

const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

//protected page middleware
app.use('/protected', async(req, res, next) => {
    if (!req.session.user) {
        return res.status(403).render('forbiddenAccess', {HTMLtitle: "forbiddenAccess-Page"});
    } else {
      next();
    }
  });
// log middleware
app.use(async(req, res, next) => {
    let currentTimeStamp = new Date().toUTCString()
    let reqMethod = req.method;
    let reqRoute = req.originalUrl;
    if (!req.session.user) {
        console.log("[" + currentTimeStamp + "]: " +  reqMethod + " " + reqRoute + " (Non-Authenticated User)")
    } else {
        console.log("[" + currentTimeStamp + "]: " +  reqMethod + " " + reqRoute + " (Authenticated User)")
    }
    next();
})

app.use(express.json());

app.use(express.urlencoded({extended: true})); //parse form

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});


