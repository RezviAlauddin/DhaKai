var express = require('express');
var router = express.Router();

// Members Page
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Home' });
 });
// router.get('/', ensureAuthenticated, function(req, res, next) {
//   res.render('index', { title: 'Home' });
// });

// function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect('/users/login');

// }

module.exports = router;
