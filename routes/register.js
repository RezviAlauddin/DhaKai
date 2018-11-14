var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// router.post('/send',function(req,res,next){
// 	var transporter= nodemailer.createTransport({
// 		host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
// 		service:'Gmail',
// 		auth:{
// 			user:'rezvialauddin@gmail.com',
// 			pass:'zhyynfxshbpluarjh'
// 		}
// 	})
// 	var mailOptions = {
// 		from:'Rezvi Alauddin <rezvialauddin@gmail.com>',
// 		to: 'Rezvi Alauddin <rezvialauddin@gmail.com>',
// 		subject:'website submission',
// 		text:'user detaails, Name'+req.body.name+'Email'+req.body.email+'Message'+req.body.message,
// 		html:'<p>info..........</p>'

// 	};
// 	transporter.sendMail(mailOptions,function(error,info){
// 		if(error){
// 			console.log(error);
// 			res.redirect('/');
// 		} else{
// 			console.log('Message sent'+info.response);
// 			res.redirect('/');
// 		}
// 	});
// });
module.exports = router;
