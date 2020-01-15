// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

var event;
var name;
var curr_year_bday;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request.friend)
    sendResponse({sent: "sent"});
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {

      const headers = new Headers({
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
      })

      //ADD WHEN REQUEST.FRIEND == NULL TO ACCOUNT FOR RANDOM RIGHT CLICK ON THE PAGE

      if (request.friend !== "null" && request.friend !== "UNDO"){
      var lst = request.friend.split('(')
      name = lst[0].trim()
      var date_lst = lst[1].split(')')
      var date = date_lst[0]
      var month = date.split('/')[0]
      var day = date.split('/')[1]
      var d = new Date()
      var curr_year = d.getFullYear()

      curr_year_bday = curr_year+'-'+month+'-'+day
      console.log(name, curr_year_bday)

      event = {
        'summary': name + "'s Birthday",
        'start': {
          'date': curr_year_bday
        },
        'end': {
          'date': curr_year_bday
        },
        'recurrence': [
           'RRULE:FREQ=YEARLY;COUNT=2'
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 72 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };

      //console.log('creating event: ', event)

      //save to storage
      // var saved_data;
      // try{
      //   chrome.storage.sync.get(['birthday'], function(data){
      //     saved_data = data['birthday'][name]={"date":curr_year_bday};
      //   });
      // } catch(error){
      //   saved_data={'birthday':{name:{"date":curr_year_bday}}}
      // }
      // console.log(saved_data)
      chrome.storage.sync.set({"birthday":{"name":name, "date":curr_year_bday, "gifturl":"", "giftdescription":""}}, function() {
        console.log("saved");
      });

      const createParams = {
        headers: headers,
        method: "POST",
        body: JSON.stringify(event)
      };

      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', createParams)
        .then((response) => response.json()) // Transform the data into json
        .then(function(data) {
          //console.log('creating events response', data)
        })
      }

      if (request.friend == "UNDO"){
        const deleteParams = {
          headers: headers,
          method: "DELETE",
          body: JSON.stringify(event)
        };
        fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', createParams)
          .then((response) => response.json()) // Transform the data into json
          .then(function(data) {
            console.log('deleting events response', data)
          })
        chrome.storage.local.remove({name})
      }
    })
});

//const queryParams = { headers };

//fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
//  .then((response) => response.json()) // Transform the data into json
//  .then(function(data) {
//    console.log('fetching events response', data)
//  })
