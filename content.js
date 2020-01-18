

// chrome.contextMenus.create({
//   id: "addbirthday",
//   title: "Add Birthday to Google Calendar", 
//   contexts:["selection"], 
//   onclick: addBirthday
// });

// function addBirthday(e){
//   var birthday = e.target.parentElement.getAttribute("data-tooltip-content")
//     chrome.runtime.sendMessage({friend:birthday}, function(response){
//       console.log(response.sent);
//     })
// }