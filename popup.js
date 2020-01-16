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
    console.log(data.birthday);
    var bday = data.birthday;
    var names = Object.keys(bday).sort(function(a,b) {
      return (new Date(bday[a].date) - new Date(bday[b].date))});
    console.log(names);
    for (var index in names){
      let name = names[index];
      console.log(bday[name]);
      let row = displayBirthday.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let text1 = document.createTextNode(name);
      let text2 = document.createTextNode(bday[[name]].date);
      cell1.appendChild(text1);
      cell2.appendChild(text2);

      // cell1.innerHTML = name;
      // cell2.innerHTML = bday[[name]].date;
    }
});

let addGift = document.getElementById('addGift');
addGift.onclick = function(element){
  window.location.href = "addgift.html";
}
