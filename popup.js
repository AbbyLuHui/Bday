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
let displayBirthday = document.getElementById('displayBirthday');
chrome.storage.local.get(['birthday'], function(data){
    console.log(data);
    var bday = data.birthday;
    var names = Object.keys(bday).sort(function(a,b) {
      return (new Date(bday[a].date) - new Date(bday[b].date))});
    for (var index in names){
      let name = names[index];
      let row = displayBirthday.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      var text1 = document.createElement('label');
      text1.for = "chk";
      text1.innerHTML = name;
      text1.name = "friend";
      var chk = document.createElement('input');
      chk.type = "checkbox";
      let text2 = document.createTextNode(bday[[name]].date);
      cell1.appendChild(text1);
      cell2.appendChild(text2);
    }
});



document.body.onclick = function(element){
  if (element.target.name == "friend"){
    chrome.storage.local.set({"current_friend":element.target.innerHTML});
    window.location.href = "profile.html";
  }
}
