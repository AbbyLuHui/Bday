'use strict';

var contextMenusItem = {
  id: "addbirthday",
  title: "Add Birthday to Google Calendar",
  contexts:['image'],
  documentUrlPatterns: ["https://www.facebook.com/events/birthdays/"],
  targetUrlPatterns: ["https://*.fbcdn.net/*"]
};


chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create(contextMenusItem);
  chrome.storage.sync.get(['birthday'], function(data){
    console.log(data.birthday);
    if (!("birthday" in data)){
      chrome.storage.sync.set({"birthday":{}})
      console.log("Set");
    }
  })
  chrome.identity.getAuthToken({ 'interactive': true });
});

var event;
var lst;
var name;
var curr_year_bday;
var temp;
var calendar_year_bday;

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){
     console.log(request.friend);
     sendResponse({sent: "sent"});
     temp = request.friend;
});

chrome.contextMenus.onClicked.addListener(function(){
  chrome.storage.sync.get(function(data){
    lst = temp.split('(')
    name = lst[0].trim()
    if (!(name in data.birthday)){
      contextOnClick();
    }
  })
});

function contextOnClick(e){
    var date_lst = lst[1].split(')')
    var date = date_lst[0]
    var month = date.split('/')[0]
    var day = date.split('/')[1]
    var d = new Date()
    var curr_year = d.getFullYear()

    var daytoInt = {"Sunday":0, "Monday":1, "Tuesday":2, "Wednesday":3,
                    "Thursday":4, "Friday":5, "Saturday":6};
    if (month in daytoInt){
      const today = d.getDay();
      var diff = Math.abs(today - daytoInt[[month]]);
      if (diff == 0){
        diff = 7
      }
      d.setDate(d.getDate() + diff);
      month = d.getMonth()+1;
      day = d.getDate();
    }

    curr_year_bday = month+' / '+day
    calendar_year_bday = curr_year+'-'+month+'-'+day
    createBirthdayEvent();
}

function createBirthdayEvent(){
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    const headers = new Headers({
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'
    })

    event = {
      'summary': name + "'s Birthday",
      'start': {
        'date': calendar_year_bday
      },
      'end': {
        'date': calendar_year_bday
      },
      'recurrence': [
         'RRULE:FREQ=YEARLY'
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 72 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };

    const createParams = {
      headers: headers,
      method: "POST",
      body: JSON.stringify(event)
    };

     fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events/', createParams)
       .then((response) => response.json()) // Transform the data into json
       .then(function(d) {
         var id = d.id;
         chrome.storage.sync.get(['birthday'], function(data){
            if (data.birthday !== 'undefined'){
             var bday_data = data.birthday;
             bday_data[name]={"date":curr_year_bday, "gifturl":[], "giftdescription":[], "phone":"", "message":"", "id":id};
             chrome.storage.sync.set({"birthday":bday_data}, function(){
               console.log("defined,", bday_data);
             });
            } else{
             var bday_data={"birthday":{[name]:{"date":curr_year_bday, "gifturl":[], "giftdescription":[], "phone":"", "message":"", "id":id}}};
             chrome.storage.sync.set(bday_data);
             console.log("undefined,", bday_data);
           };
         });
       });
      chrome.storage.sync.set({"current_friend":name});
  })
};
