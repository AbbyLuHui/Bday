'use strict';

let giftSubmitButton = document.getElementById('giftSubmitButton');
console.log("started");
giftSubmitButton.onclick = function(element){
  console.log('clicked');
  chrome.storage.local.get("current_friend", function(data){

  let name = data.current_friend;
  console.log(name);
  let url = document.getElementById('url').value;
  let description = document.getElementById('description').value;
  var modified={};
  var date="";
  chrome.storage.local.get("birthday", function(data){
    modified = data;

    modified.birthday[[name]]["gifturl"].push(url);
    modified.birthday[[name]]["giftdescription"].push(description);
    console.log(modified.birthday[[name]]["gifturl"]);
    chrome.storage.local.set(modified);
   });
  });
  window.location.href = "profile.html";

}

let giftCancelButton = document.getElementById('giftCancelButton');
giftCancelButton.onclick = function(element){
  window.location.href = 'profile.html';
}
