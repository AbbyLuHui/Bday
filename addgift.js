// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
//
// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
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
    console.log(modified.birthday[[name]]["gifturl"]);
    console.log(modified.birthday[[name]]["gifturl"]);
    modified.birthday[[name]]["gifturl"].push(url);
    modified.birthday[[name]]["giftdescription"].push(description);
    chrome.storage.local.set(modified, function(){
      console.log("modified");
    });
  });
  });
  window.location.href = "profile.html";

}

let giftCancelButton = document.getElementById('giftCancelButton');
giftCancelButton.onclick = function(element){
  window.location.href = 'profile.html';
}
