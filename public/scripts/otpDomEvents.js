var $contactElem = document.getElementsByClassName('contacts');

for (var i=0;i<$contactElem.length;i++) {
	$contactElem[i].addEventListener('click',controller.loadContacts);
};

var $msgElem = document.getElementsByClassName('messages');

for (var i=0;i<$msgElem.length;i++) {
	$msgElem[i].addEventListener('click',controller.loadMessages);
}; 

var $msgIcon = document.getElementsByClassName('sendMessage');

for (var i=0;i<$msgIcon.length;i++) {
	$msgIcon[i].addEventListener('click',controller.sendMessage);
};

var $sendMsg = document.getElementById('sendMsg');
$sendMsg.addEventListener('click',controller.send)

var $goBack = document.getElementById('goBack');
$goBack.addEventListener('click',controller.loadContacts)

document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
  document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
  this.classList.remove('is-visible');
}, false);