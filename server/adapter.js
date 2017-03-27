var db = require(__dirname+'/db.js');
var twilio = require('twilio');
var client = new twilio.RestClient('ACd844a10af60ccd8415e14b9c31f0ff1c', '8eb9fab033936dab0af70ef3369e54f5');
var api = {
	fetchContacts : function(response){
		db.fetchContactsFromDB(response);
	},
	sendMessage : function(data,response){
		client.sendSms({
		    to:'+918667693204',
		    from:'+16106165887',
		    body:data.message
		}, function(error, message) {
		    if (!error) {
		        console.log(message.sid);
		        console.log('Message sent on:');
		        console.log(message.dateCreated);
		        data.status = "success";
		        api.storeMessage(data);
		        response.write("success");
		        response.end();
		    } else {
		    	console.log(error)
		    	data.status = "failure";
		        api.storeMessage(data);
		        response.write("error");
		        response.end();
		    }
		});
	},
	storeMessage:function(data){
		db.storeMessage(data);
	},
	fetchMessages:function(response){
		db.fetchMessagesFromDB(response);
	}
};

module.exports = api;