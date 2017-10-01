
// everything will be done in this order as written in here remember

const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials') //reuse htmls redundant code wherever you like
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));//express middleware registered to app to read from a static directory 

//custom middleware
app.use((req,res,next)=>{  //next used in order to continue the execution other wise it wil stop there 

var date = new Date().toString();
var log= `${date} : ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n');
next(); // without next nothing will execute further
});


hbs.registerHelper('getCurrentYear',()=>{
 return new Date().getFullYear();
});//getCurrentYear will bw replaced by callback function in every hbs file 

hbs.registerHelper('toUpperCase',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	res.send('hello express!'); //automatically set the response type ;
	// res.send({
	// 	name:'arvinder',
	// 	likes:'1234r'
	// })
});


app.get('/about',(req,res)=>{
	//res.send('new route');
	res.render('about.hbs',{ // take file from the views folder
		pageTitle:'arvinder',
		nbody:'singh',
		currentYear:2017
	});//handlebars
})

app.listen(3000);