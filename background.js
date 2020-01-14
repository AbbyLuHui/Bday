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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request.friend);
    sendResponse({sent: "sent"});
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      const headers = new Headers({
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'
      })

      const queryParams = { headers };

      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
        .then((response) => response.json()) // Transform the data into json
        .then(function(data) {
        console.log("Succeed");
        })
      })
      // Lucy Chen (2/7)
      var lst = request.friend.split('(')
      var name = lst[0].trim()
      var date_lst = lst[1].split(')')
      var date = date_lst[0]
      var month = date.split('/')[0]
      var day = date.split('/')[1]
      var d = new Date()
      var curr_year = d.getFullYear()

      var curr_year_bday = curr_year+'-'+month+'-'+day
      console.log(name, curr_year_bday)

      var event = {
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
      
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
      
      request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
      });
    });
