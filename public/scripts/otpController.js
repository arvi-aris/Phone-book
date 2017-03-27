var controller = {
	loadContacts : function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", '/loadContacts', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () { 
		    if (xhr.readyState == 4 && xhr.status == 200) {
		      var response = JSON.parse(xhr.responseText);
		      controller.parseContacts(response);
		    }else{
		      console.log("error")
		    }
		}
		xhr.send();		
	},
	parseContacts : function(response){
		var contactsMarkup = "";
		var listDOM = document.getElementById('contactList')
		for(var i=0;i<response.length;i++){
			var tempIcon = '<li class="mdl-list__item mdl-list__item--three-line" name="'+response[i].name+'" mobile="'+response[i].mobile+'"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">person</i>';
      		var tempName = '<span>'+response[i].name+'</span>';
      		var tempBody = '<span class="mdl-list__item-text-body">'+response[i].mobile+'</span></span>'
      		var tempAction = '<span class="mdl-list__item-secondary-content sendMessage" mongo_id="'+response[i]._id+'"><a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">chat</i></a></span></li>';
      		var tempMarkup = tempIcon + tempName + tempBody + tempAction;
      		contactsMarkup += tempMarkup;
		}
		listDOM.innerHTML = contactsMarkup;
		var $msgIcon = document.getElementsByClassName('sendMessage');

		for (var i=0;i<$msgIcon.length;i++) {
			$msgIcon[i].addEventListener('click',controller.sendMessage);
		};
		var messageContent = document.getElementById('messageContent');
		messageContent.style.display = 'none';
		var messageContent = document.getElementById('messageList');
		messageContent.style.display = 'none';
		var contactList = document.getElementById('contactList');
		contactList.style.display = 'block';
	},
	sendMessage:function(e){
		var mongo_id = e.currentTarget.getAttribute('mongo_id');
		var name = e.currentTarget.parentNode.getAttribute('name');
		var mobile = e.currentTarget.parentNode.getAttribute('mobile');
		var contactList = document.getElementById('contactList');
		contactList.style.display = 'none';  
		var messageList = document.getElementById('messageList');
		messageList.style.display = 'none';
		var nameVal = document.getElementById('nameVal'); mobVal
		nameVal.innerText = name;
		var mobVal = document.getElementById('mobVal'); 
		mobVal.innerText = mobile;
		var messageContent = document.getElementById('messageContent');
		var sendBtn = document.getElementById('sendMsg')
		sendBtn.setAttribute('mongo_id',mongo_id)
		sendBtn.setAttribute('name',name)
		sendBtn.setAttribute('mobile',mobile);
		var no = controller.getRandomNo();
		document.getElementById('message').value = "Your OTP is : "+no;
		document.getElementById('message').disabled = true;
		messageContent.style.display = 'block';
	},
	send : function(e){
		var data = {
			mongo_id : e.currentTarget.getAttribute('mongo_id'),
			name : e.currentTarget.getAttribute('name'),
			mobile : e.currentTarget.getAttribute('mobile'),
			message : document.getElementById('message').value
		};
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/sendMessage', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () { 
		    if (xhr.readyState == 4 && xhr.status == 200) {
		      if(xhr.responseText == "success"){
		      	//controller.notify("Message has sent");
		      	alertify.success('Message sent successfully');
		      	controller.loadContacts();
		      }else{
		      	alertify.error('Sending failed');
		      }
		    }else if (xhr.readyState == 4 && xhr.status !== 200){
		    	alertify.error('Internal server error');
		    }
		}
		xhr.send(JSON.stringify(data));		
	},
	getRandomNo : function(){
		return Math.floor(Math.random() * 10000)
	},
	loadMessages : function(){
	/*	document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible');
		document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');  */
		var xhr = new XMLHttpRequest();
		xhr.open("GET", '/loadMessages', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () { 
		    if (xhr.readyState == 4 && xhr.status == 200) {
		      var response = JSON.parse(xhr.responseText);
		      controller.parseMessages(response);
		    }else{
		      console.log("error")
		    }
		}
		xhr.send();		
	},
	parseMessages : function(response){
		var messagesMarkup = "";
		var listDOM = document.getElementById('messageList')
		for(var i=0;i<response.length;i++){
			if(response[i].status = "success")
				var tempIcon = '<li class="mdl-list__item mdl-list__item--three-line" name="'+response[i].name+'" mobile="'+response[i].mobile+'"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">sms</i>';
      		else
 				var tempIcon = '<li class="mdl-list__item mdl-list__item--three-line" name="'+response[i].name+'" mobile="'+response[i].mobile+'"><span class="mdl-list__item-primary-content"><i class="material-icons  mdl-list__item-avatar">sms_failed</i>';    			
      		var tempName = '<span>'+response[i].name+' '+response[i].mobile+'</span>';
      		var tempBody = '<span class="mdl-list__item-text-body">'+response[i].message+'</span></span>'
      		//var tempAction = '<span class="mdl-list__item-secondary-content sendMessage" mongo_id="'+response[i]._id+'"><a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">chat</i></a></span></li>';
      		var tempMarkup = tempIcon + tempName + tempBody;
      		messagesMarkup += tempMarkup;
		}
		listDOM.innerHTML = messagesMarkup;
		var messageContent = document.getElementById('messageContent');
		messageContent.style.display = 'none';
		var contactList = document.getElementById('contactList');
		contactList.style.display = 'none';
		listDOM.style.display = 'block';
	},
	notify:function(message){
		if(!alertify.myAlert){
  //define a new dialog
  alertify.dialog('myAlert',function(){
    return{
      main:function(message){
        this.message = message;
      },
      setup:function(){
          return { 
            buttons:[{text: "Close!", key:27/*Esc*/}],
            focus: { element:0 }
          };
      },
      prepare:function(){
        this.setContent(this.message);
      }
  }});
}
//launch it.
alertify.myAlert(message);
	}
};

