var mongo = {
	MongoClient : require('mongodb').MongoClient,
	/*
	 * Method to connect with DB
	 */
	startMongo : function(callback){
		mongo.MongoClient.connect('mongodb://arvi:arvi7878@ds011913.mlab.com:11913/kisan-network', (err, database) => {
		   if(err){
		   	console.log(err);
		   	return false;
		   }
		   mongo.db =database;
		   console.log("DB connection success");
		   callback();
		});
	},
	fetchContactsFromDB:function (response) {
		if(!mongo.db){
			mongo.startMongo(function(){
				mongo.db.collection('otp').find().toArray()
				.then(function(data){
					response.send(data);
				})
			});
			return;
		}
		mongo.db.collection('otp').find().toArray()
			.then(function(data){
				response.send(data);
			})
	},
	storeMessage:function(data){
		mongo.db.collection('message').insertOne(data);
	},
	fetchMessagesFromDB:function(response){
		var sort = {'_id': -1}
		mongo.db.collection('message').find().sort(sort).toArray()
			.then(function(data){
				response.send(data);
			})
	}
	
};
module.exports = mongo;
