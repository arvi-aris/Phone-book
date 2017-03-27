const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser')
const path = require('path');
const api = require(__dirname+'/server/adapter.js')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res) => {
	res.sendFile(__dirname+"/public/views/home.html");
});


app.get('/loadContacts',(req,res) => {
	api.fetchContacts(res);
}); 

app.get('/loadMessages',(req,res) => {
	api.fetchMessages(res);
});

app.post('/sendMessage',(req,res) => {
	var data = req.body;
	api.sendMessage(data,res);
});

app.listen(PORT,() => {
	console.log('listening at port : ' + PORT)
});