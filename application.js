// Basic Implementation Template of middlewares of Helmet JS on Node.js
//Setting various HTTp Headers
//Author: Leonardo Wilhelm

var https = require('https');
var helmet = require('helmet');
var express = require('express');
const app = express();

// Middleware for loading cross domain content
app.use(helmet.permittedCrossDomainPolicies());

// Middleware for Cross-Site Scripting(XSS)
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["unsafe-inline'"],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
  }));

// Middleware for Expect CT Policy
app.use(helmet.expectCt({
    enforce: true,
    maxAge: 100
}));
// Middleware for DNS Prefetch Control
app.use(helmet.dnsPrefetchControl())

// Middleware for HTTP Public Key Pinning policy
const sixtyDaysInSeconds = 5184000;
app.use(helmet.hpkp({
  maxAge: sixtyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}));
// Middleware for Browser Caching
app.use(helmet.noCache());
//Middleware for preventing attacks using HTTP Referer header
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Middleware for FrameGuard Clickjacking prevention
app.use(helmet.frameguard({ action: 'sameorigin' }));

//Middleware for Feature Policy-Restricts which browser features can be used
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ['example.com'],
    syncXhr: ["'none'"]
  }
}))

//Middleware for hiding code
app.use(helmet.hidePoweredBy());
//Middleware for keeping users on HTTPS
const sixtyDaysInSeconds = 5184000;
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}));

//Middleware for  Reflected XSS Attacks
app.use(helmet.xssFilter());

//Middleware for Don't sniff mimetype middleware
app.use(helmet.noSniff());

//Middleware that sets the X-Download-options on Internet Explorer
app.use(helmet.ieNoOpen());

app.use(express.static('public'))

const router = express.Router()
app.use('/api',router)

//to perform login using express JS. Form method = post
app.post('/login',function(req,res){
//Some code here. For example, To validate login credentials.
})

app.listen(8000);
https.createServer(options, app).listen(8080);