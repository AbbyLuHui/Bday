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
  var name = document.getElementById('name');
  let url = document.getElementById('url').value;
  let description = document.getElementById('description').value;
  var modified={};
  var date="";
  chrome.storage.local.get(['birthday'], function(data){
    modified = {"birthday":{"name":data.birthday.name, "date":data.birthday.date, "gifturl":url, "giftdescription":description}};
    chrome.storage.local.set(modified, function(){
      console.log("modified");
    });
  });
    //window.location.href = "popup.html";

}
